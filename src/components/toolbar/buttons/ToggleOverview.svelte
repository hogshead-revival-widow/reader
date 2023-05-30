<script lang="ts">
import { CONSTS } from '../../../config/consts';
import { isOverviewOpen, selectedArticles } from '../../../lib/stores';

$: hasSelectedSomething = $selectedArticles.size > 0;
const catchKey = (e: KeyboardEvent) =>
  $selectedArticles.size < 1 || e.key !== CONSTS.INTERFACE.KEYS.TOGGLE_OVERVIEW
    ? undefined
    : isOverviewOpen.toggle();
</script>

<svelte:window on:keydown={catchKey} />
<button
  class="button is-dark is-outlined"
  title="ALT: Überblick (ausgewählte Artikel)"
  on:click|preventDefault={isOverviewOpen.toggle}
  class:is-invisible={!hasSelectedSomething}
  >📋
</button>
