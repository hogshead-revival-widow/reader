import Reader__SvelteComponent_ from '../components/Reader.svelte';
import { getCollectionBoxInfo } from '../lib/collectionbox/collectionBoxInfo';
import {
  currentArticleId,
  currentArticles,
  selectedArticles,
} from '../lib/stores';

const load = async (document) => {
  chrome.runtime.sendMessage(true);
  chrome.runtime.onMessage.addListener((req, sender) => {
    console.log({ req, sender });
  });
  chrome.runtime.sendMessage(true);

  const { name, href, articles, selected } = getCollectionBoxInfo(
    document,
    'fromURL'
  );

  selectedArticles.init(selected);

  await currentArticles.init(articles);
  if (articles.length === 0)
    throw new Error('Kann Reader nicht öffnen, keine Artikel!');

  currentArticleId.set(articles[0]);
  const target = document.getElementById('app');
  if (!target) return;
  new Reader__SvelteComponent_({
    target,
    props: {
      collectionBoxName: name,
      collectionBoxHref: href,
    },
  });
};

document.addEventListener('DOMContentLoaded', () => load(document));
