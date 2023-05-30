<script lang="ts">
import { fly } from 'svelte/transition';

import {
  articleChangeAnimation,
  currentArticleId,
  currentArticleIsSelected,
  currentArticles,
  selectedArticles,
} from '../../lib/stores';
import Loader from './Loader.svelte';
import Metadata from './Metadata.svelte';

$: promisedArticle = currentArticles.getFulltext($currentArticleId);
</script>

{#await promisedArticle}
  <Loader />
{:then article}
  <article
    class="notification text"
    in:fly|local={$articleChangeAnimation}>
    <button
      on:click|preventDefault={selectedArticles.toggleCurrentArticle}
      title="Artikel auswählen"
      class="heart is-size-1 has-background-light">
      <span
        class:has-text-dark={$currentArticleIsSelected}
        class:has-text-grey-light={!$currentArticleIsSelected}>
        ♥
      </span></button>
    <div class="content">
      <Metadata
        {article}
        exclude={['date']} />
      <p class="subtitle">
        {article.date}
      </p>
      <p class="title">
        {article.title.shti}
      </p>
      {#each article.title.soti as subtitle}
        <p class="subtitle">
          {subtitle}
        </p>
      {/each}
      <div class="content">
        {@html article.text}
      </div>
    </div>
    <Metadata {article} />
  </article>
{/await}

<style>
.text {
  max-width: 777px !important;
}

.heart {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  cursor: pointer;
}
</style>
