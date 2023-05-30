import { derived, get } from 'svelte/store';

import { CONSTS } from '../../config/consts';
import { currentArticleId } from './currentArticleId';
import { currentArticles } from './currentArticles';

const makeArticleChangeAnimation = () => {
  let previousIdx: number = 0;
  const state = derived(currentArticleId, ($currentArticleId) => {
    if ($currentArticleId === undefined)
      return CONSTS.INTERFACE.ANIMATION.ARTICLE_IN_RIGHT;
    const newIdx = get(currentArticles).findIndex(
      (id) => id === $currentArticleId
    );
    const oldPrevious = previousIdx;
    previousIdx = newIdx;
    console.log({ oldPrevious }, { previousIdx }, { newIdx });
    if (newIdx >= oldPrevious)
      return CONSTS.INTERFACE.ANIMATION.ARTICLE_IN_LEFT;
    return CONSTS.INTERFACE.ANIMATION.ARTICLE_IN_RIGHT;
  });

  return { subscribe: state.subscribe };
};

export const articleChangeAnimation = makeArticleChangeAnimation();
