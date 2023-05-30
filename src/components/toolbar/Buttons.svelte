<script lang="ts">
import { currentArticleIsSelected, selectedArticles } from '../../lib/stores';
import Accept from './buttons/Accept.svelte';
import Reset from './buttons/Reset.svelte';
import Select from './buttons/Select.svelte';
import ToggleOverview from './buttons/ToggleOverview.svelte';

$: hasSelectedSomething = $selectedArticles.size > 0;
</script>

<div class="buttons">
  {#key $currentArticleIsSelected}
    <Select />
  {/key}
  {#key hasSelectedSomething}
    <Accept />
    <ToggleOverview />
    <Reset />
  {/key}
</div>
