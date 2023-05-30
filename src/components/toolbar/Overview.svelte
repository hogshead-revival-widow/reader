<script lang="ts">
import { blur, fade, fly } from 'svelte/transition';

import { CONSTS } from '../../config/consts';
import { clickOutside } from '../../lib/clickOutside';
import { closeReader } from '../../lib/closeReader';
import {
  currentArticleId,
  currentArticles,
  isOverviewOpen,
  selectedArticles,
} from '../../lib/stores';
import Metadata from '../text/Metadata.svelte';
import Accept from './buttons/Accept.svelte';
import Reset from './buttons/Reset.svelte';

const catchKey = (e: KeyboardEvent) => {
  if (!$isOverviewOpen) return;
  if (e.key === 'Escape') return isOverviewOpen.toggle();
  if (e.key === 'Control') return closeReader();
};

let promisedMetadata = selectedArticles.getMetadata();

$: if ($isOverviewOpen && $selectedArticles) {
  promisedMetadata = selectedArticles.getMetadata();
}

$: $isOverviewOpen
  ? document.querySelector('html')?.classList.add('is-clipped')
  : document.querySelector('html')?.classList.remove('is-clipped');
</script>

<svelte:window on:keydown={catchKey} />
{#if $isOverviewOpen}
  <div
    class="modal is-active"
    transition:blur>
    <div class="modal-background" />
    <div
      class="modal-content"
      use:clickOutside
      on:click_outside={isOverviewOpen.toggle}>
      <div class="box is-hoverable">
        <table class="table">
          <tbody>
            <tr>
              <td>
                {#await promisedMetadata then metadata}
                  <p
                    class="tag"
                    class:is-warning={metadata.articles >=
                      CONSTS.INTERFACE.WARNING_THRESHOLD_ARTICLE_AMOUNT}>
                    Artikel:&nbsp;<span in:fade={{ delay: 350 }}
                      >{metadata.articles}</span>
                  </p>
                  <p class="tag">
                    Normseiten:&nbsp;<span in:fade={{ delay: 350 }}
                      >~{metadata.normpages}</span>
                  </p>

                  <p class="tag">
                    Wörter:&nbsp;<span in:fade={{ delay: 350 }}
                      >{metadata.words}</span>
                  </p>
                {/await}
              </td>

              <td>
                <div class="buttons">
                  <Reset />
                  <Accept />
                </div>
              </td>
            </tr>
            {#each [...$selectedArticles] as id (id)}
              <tr out:fly|local={CONSTS.INTERFACE.ANIMATION.LIST_ITEM_REMOVED}>
                {#await currentArticles.getFulltext(id) then article}
                  <td>
                    <a
                      href="/zeigen/{id}"
                      class="has-text-black"
                      on:click|preventDefault={() => {
                        $currentArticleId = id;
                        isOverviewOpen.close();
                      }}
                      title="Artikel zeigen">
                      {article.title.shti}</a>
                    <Metadata
                      {article}
                      include={[
                        'date',
                        'source',
                        'normPageLength',
                        'wordLength',
                      ]} />
                  </td>
                {/await}
                <td>
                  <button
                    class="button is-danger is-outlined"
                    title="Artikel löschen"
                    on:click={() => selectedArticles.remove(id)}>
                    Löschen
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="Schließen" />
  </div>
{/if}
