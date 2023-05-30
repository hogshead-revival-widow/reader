<script lang="ts">
import { fade } from 'svelte/transition';

import {
  currentArticleId,
  currentArticles,
  isOverviewOpen,
} from '../../lib/stores';

$: currentPage = $currentArticles.findIndex((id) => id === $currentArticleId);

export const openArticle = (which: ArticleChangeMode) => {
  const idxSubmitted = typeof which === 'number';
  let idx = idxSubmitted
    ? which
    : which === 'next'
    ? currentPage + 1
    : currentPage - 1;
  let exists = $currentArticles[idx] !== undefined;
  if (!exists && !idxSubmitted && which == 'next') idx = 0;
  if (!exists && !idxSubmitted && which == 'previous')
    idx = $currentArticles.length - 1;
  exists = $currentArticles[idx] !== undefined;
  if (!exists) throw new Error('Artikel nicht gefunden?');
  currentPage = idx;
  if ($currentArticleId !== undefined)
    scrollPositions[$currentArticleId] = [window.scrollX, window.scrollY];
  $currentArticleId = $currentArticles[idx];
  const [x, y] = scrollPositions[$currentArticleId];
  window.scrollTo(x, y);
  return idx;
};

$: _total = $currentArticles.length - 1;
$: scrollPositions = Object.fromEntries(
  $currentArticles.map((id) => [id, [0, 0]])
);
$: showProceed = _total > 1;
$: showGoBack = _total > 1;

const catchKey = (e: KeyboardEvent) => {
  if ($isOverviewOpen) return;
  if (e.key === 'ArrowRight') return openArticle('next');
  if (e.key === 'ArrowLeft') return openArticle('previous');
};
</script>

<svelte:window on:keydown={catchKey} />

<nav>
  {#key showGoBack}
    <button
      title="PFEILTASTE LINKS: Vorheriger Artikel"
      class="button is-dark is-outlined"
      class:is-invisible={!showGoBack}
      in:fade
      on:click|preventDefault={() => openArticle('previous')}>
      ←
    </button>
  {/key}

  {#key showProceed}
    <button
      title="PFEILTASTE RECHTS: Nächster Artikel"
      class="button is-dark is-outlined"
      class:is-invisible={!showProceed}
      in:fade
      on:click|preventDefault={() => openArticle('next')}>
      →
    </button>
  {/key}
</nav>
