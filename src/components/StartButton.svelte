<script lang="ts">
import { onDestroy } from 'svelte';

import { sendOpenReaderMsg } from '../lib/collectionbox/collectionBoxInfo';
import { getCurrentArticles } from '../lib/collectionbox/extractIds';

const hasArticles = (document: Document) =>
  getCurrentArticles(document).length > 0;
let showButton = hasArticles(document);
let interval = setInterval(() => (showButton = hasArticles(document)), 250);
onDestroy(() => clearInterval(interval));
</script>

{#if showButton}
  <button
    title="Sammelbox lektorieren"
    class="ui basic button icon no-shadow"
    on:click={() => sendOpenReaderMsg(document)}>
    <i
      aria-hidden="true"
      class="icon button newspaper large" />

    !!!!!!!!!!!
  </button>
{/if}
