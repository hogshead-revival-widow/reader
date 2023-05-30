<script lang="ts">
import { fade } from 'svelte/transition';

import { CONSTS } from '../../../config/consts';
import { closeReader } from '../../../lib/closeReader';
import { selectedArticles } from '../../../lib/stores';

$: hasSelectedSomething = $selectedArticles.size > 0;
const catchKey = (e: KeyboardEvent) =>
  $selectedArticles.size < 1 || e.key !== CONSTS.INTERFACE.KEYS.ACCEPT
    ? ''
    : closeReader();
</script>

<svelte:window on:keydown={catchKey} />
<button
  class="button is-dark is-outlined"
  in:fade
  title="STRG: Ausgewählte Artikel in CS übernehmen"
  class:is-invisible={!hasSelectedSomething}
  on:click={async () => await closeReader()}>
  ↗ CS
</button>
