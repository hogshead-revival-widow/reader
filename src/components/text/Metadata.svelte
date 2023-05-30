<script lang="ts">
import { articleToTags } from '../../lib/article/articleToTags';
import Tag from './Tag.svelte';

export let article: Article;
const tags = articleToTags(article);
export let include = Object.keys(tags) as (keyof typeof tags)[];
export let exclude: (keyof typeof tags)[] = [];
$: display = Object.keys(tags)
  .filter((key) => include.includes(key as keyof typeof tags))
  .filter((key) => !exclude.includes(key as keyof typeof tags));
</script>

<article class="tags">
  {#each display as key}
    <Tag {...tags[key]} />
  {/each}
</article>
