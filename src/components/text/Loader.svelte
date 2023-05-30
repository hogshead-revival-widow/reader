<script lang="ts">
import { onDestroy, onMount } from 'svelte';

import { CONSTS } from '../../config/consts';

let show = false;
let timeoutId: number | undefined = undefined;

onMount(() => {
  timeoutId = setTimeout(() => (show = true), CONSTS.INTERFACE.LOADER_DELAY);
});

onDestroy(() => clearTimeout(timeoutId));
</script>

{#if show}
  <article class="notification text">
    <p class="card-header-title">Bitte einen Moment warten.</p>
    <div class="content">
      <progress
        class="progress is-large is-info"
        max="100">Lade...</progress>
    </div>
  </article>
{/if}
