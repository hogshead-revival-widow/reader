<script lang="ts">
import { fade } from 'svelte/transition';

import { CONSTS } from '../../../config/consts';
import {
  currentArticleIsSelected,
  isOverviewOpen,
  selectedArticles,
} from '../../../lib/stores';

const catchKey = (e: KeyboardEvent) =>
  e.key === CONSTS.INTERFACE.KEYS.SELECT && !$isOverviewOpen
    ? selectedArticles.toggleCurrentArticle()
    : undefined;
</script>

<svelte:window on:keydown={catchKey} />

<button
  class="button is-dark"
  class:is-outlined={!$currentArticleIsSelected}
  on:click={selectedArticles.toggleCurrentArticle}
  in:fade|local>
  ⏎
</button>
