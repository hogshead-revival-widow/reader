<script lang="ts">
import { currentArticleId, currentArticles } from '../../lib/stores';

export let name: string;
export let href: string;
const nameCutoff = 15;

$: shortName =
  name.length > nameCutoff
    ? name.slice(0, nameCutoff).trim() + '&hellip;'
    : name;
$: currentProgress = $currentArticles.findIndex(
  (id) => id === $currentArticleId
);
$: maxProgress = $currentArticles.length - 1;
</script>

<a
  {href}
  rel="noreferrer"
  target="_blank"
  class="subtitle"
  title="Sammelbox: {name}">
  „{@html shortName}“
  <progress
    class="progress is-small"
    max={maxProgress}
    value={currentProgress} />
</a>
