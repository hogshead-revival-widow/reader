<script lang="ts">
import 'bulma/css/bulma.css';

import { currentArticleId } from '../lib/stores';
import Loader from './text/Loader.svelte';
import Text from './text/Text.svelte';
import CollectionBoxInfo from './toolbar/CollectionBoxInfo.svelte';
import Hotkeys from './toolbar/Hotkeys.svelte';
import Nav from './toolbar/Nav.svelte';
import Overview from './toolbar/Overview.svelte';
import Pagination from './toolbar/Pagination.svelte';

export let collectionBoxName: string;
export let collectionBoxHref: string;

let openArticle: (which: number | 'next' | 'previous') => number;
</script>

{#if $currentArticleId !== undefined}
  <Nav>
    <Pagination
      slot="start"
      bind:openArticle />
    <CollectionBoxInfo
      slot="center"
      name={collectionBoxName}
      href={collectionBoxHref} />
    <Hotkeys slot="end" />
  </Nav>

  <div class="section">
    <div class="container">
      <Text />
    </div>
  </div>
{:else}
  <Loader />
{/if}

<Overview />
