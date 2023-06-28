<script lang="ts">
import { fade } from 'svelte/transition';

import { isOverviewOpen, selectedArticles } from '../../lib/stores';
import { currentArticleIsSelected } from '../../lib/stores';

export let hotkey: IHotkey;

$: hasSelectedSomething = $selectedArticles.size > 0;
const catchKey = (e: KeyboardEvent) => {
  console.log({ pressed: e.key });
  if ($isOverviewOpen && hotkey.ignoreHotkeyIfOverviewIsOpen !== true) return;
  if (hotkey.dependsOnHasSelected === true && !hasSelectedSomething) return;
  if (e.key.toLowerCase() !== hotkey.key.toLowerCase()) return;
  hotkey.action();
};
</script>

<svelte:window on:keydown={catchKey} />
<button
  class="button"
  class:is-outlined={!(
    hotkey?.fillButtonIfCurrentArticleIsSelected === true &&
    $currentArticleIsSelected
  )}
  class:is-dark={hotkey?.isDestructive !== true}
  class:is-danger={hotkey?.isDestructive === true}
  in:fade
  title="{hotkey.key.toUpperCase()}: {hotkey.title}"
  class:is-invisible={hotkey?.dependsOnHasSelected !== undefined &&
    !hasSelectedSomething}
  on:click={hotkey.action}>
  {hotkey.label}
</button>
