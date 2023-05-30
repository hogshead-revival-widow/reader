import { derived } from 'svelte/store';

import { currentArticleId } from './currentArticleId';
import { selectedArticles } from './selectedArticles';

export const currentArticleIsSelected = derived(
  [selectedArticles, currentArticleId],
  ([selectedArticles, currentArticleId]) =>
    currentArticleId !== undefined && selectedArticles.has(currentArticleId)
);
