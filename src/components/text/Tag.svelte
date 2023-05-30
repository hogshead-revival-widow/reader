<script lang="ts">
export let link: undefined | { href: string; title: string } = undefined;
export let content: string;
</script>

{#if content.length > 0}
  {#if link !== undefined}
    <a
      class="tag button is-white"
      target="_blank"
      rel="noreferrer"
      title={link.title}
      href={link.href}>
      {content}
    </a>
  {:else}
    <span class="tag is-white">{content}</span>
  {/if}
{/if}
