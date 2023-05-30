import { type Writable, get, writable } from 'svelte/store';

import { countNormpages } from '../article/countNormpages';
import { currentArticleId } from './currentArticleId';
import { currentArticles } from './currentArticles';
import { isOverviewOpen } from './isOverviewOpen';

const makeSelectedArticlesStore = () => {
  const state: Writable<Set<Article['id']>> = writable(new Set());

  const init = (value: CurrentArticles) => set(value);

  const set = (value: CurrentArticles) => {
    state.set(new Set(value));
    if (value.length === 0) isOverviewOpen.close();
  };

  const getMetadata = async () => {
    const selection = get(state);
    const metadata = { normpages: 0, articles: selection.size, words: 0 };
    if (metadata.articles === 0) return metadata;

    const articles = await Promise.all(
      [...selection].map((id) => currentArticles.getFulltext(id))
    );

    const sum = articles
      .map((article) => ({
        normpages: countNormpages(article.text),
        words: article.length,
      }))
      .reduce((accumulator, currentValue) => ({
        normpages: accumulator.normpages + currentValue.normpages,
        words: accumulator.words + currentValue.words,
      }));

    return {
      articles: metadata.articles,
      normpages: sum.normpages,
      words: sum.words,
    };
  };
  const add = (value: Article['id'] | undefined) => {
    if (value === undefined) return;
    state.update((currentSelection) => new Set([value, ...currentSelection]));
  };

  const remove = (value: Article['id'] | undefined) => {
    if (value === undefined) return;
    const selected = get(state);
    if (!selected.has(value)) return;
    set([...selected].filter((id) => id !== value));
  };

  const toggle = (value: Article['id'] | undefined) => {
    if (value === undefined) return;
    const currentSelection = get(state);
    return currentSelection.has(value) ? remove(value) : add(value);
  };

  const toggleCurrentArticle = () => toggle(get(currentArticleId));

  const reset = () => set([]);

  return {
    subscribe: state.subscribe,
    remove,
    add,
    init,
    toggle,
    getMetadata,
    toggleCurrentArticle,
    reset,
  };
};

export const selectedArticles = makeSelectedArticlesStore();
