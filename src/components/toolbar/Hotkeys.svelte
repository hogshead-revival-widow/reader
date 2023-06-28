<script lang="ts">
import { HOTKEYS } from 'src/lib/hotkeys';

import { currentArticleIsSelected, selectedArticles } from '../../lib/stores';
import Hotkey from './Hotkey.svelte';

$: hasSelectedSomething = $selectedArticles.size > 0;
</script>

<div class="buttons">
  {#each Object.values(HOTKEYS) as hotkey}
    {#if hotkey?.dependsOnHasSelected === true}
      {#key hasSelectedSomething}
        <Hotkey {hotkey} />
      {/key}
    {:else}
      {#key currentArticleIsSelected}
        <Hotkey {hotkey} />
      {/key}
    {/if}
  {/each}
</div>
