<script lang="ts">
import { fade } from 'svelte/transition';

import { CONSTS } from '../../../config/consts';
import { selectedArticles } from '../../../lib/stores';

$: hasSelectedSomething = $selectedArticles.size > 0;
const catchKey = (e: KeyboardEvent) =>
  $selectedArticles.size < 1 || e.key !== CONSTS.INTERFACE.KEYS.RESET
    ? ''
    : selectedArticles.reset();
</script>

<svelte:window on:keydown={catchKey} />

<button
  class="button is-danger is-outlined"
  on:click={selectedArticles.reset}
  in:fade
  title="BACKSPACE: Auswahl zurücksetzen"
  class:is-invisible={!hasSelectedSomething}>⌫</button>
