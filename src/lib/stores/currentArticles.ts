import { type Readable, type Writable, writable } from 'svelte/store';

import { CONSTS } from '../../config/consts';
import { getArticle } from '../article/getArticle';

const ARTICLE_CACHE_KEY = 'reader_article_cache';

const makeCurrentArticleStore = () => {
  const state: Writable<CurrentArticles> = writable([]);
  let cache: ArticleCache = [];

  const { subscribe, set } = state;

  const _set = (value: CurrentArticles) => {
    chrome.storage.session.set({
      [ARTICLE_CACHE_KEY]: cache,
    });
    set(value);
  };

  const init = async (articles: CurrentArticles) => {
    const stored = await chrome.storage.session.get({
      [ARTICLE_CACHE_KEY]: [],
    });
    if (cache.length === 0 && stored[ARTICLE_CACHE_KEY].length > 0)
      cache = stored[ARTICLE_CACHE_KEY];
    return _set(articles);
  };

  const _getArticle = async (id: Article['id'] | undefined) => {
    if (id === undefined) return CONSTS.INTERFACE.PLACEHOLDER_ARTICLE;
    const stored = (await chrome.storage.session.get({
      [ARTICLE_CACHE_KEY]: [],
    })) as { [ARTICLE_CACHE_KEY]: ArticleCache };

    if (cache.length === 0 && stored[ARTICLE_CACHE_KEY].length > 0)
      cache = stored[ARTICLE_CACHE_KEY];
    const { article, cached } = await getArticle(id, cache);
    if (!cached) cache = [...cache, article];
    chrome.storage.session.set({ [ARTICLE_CACHE_KEY]: cache });
    return article;
  };

  return {
    getFulltext: _getArticle,
    subscribe,
    init,
    set: _set,
  } as Readable<CurrentArticles> & {
    init: typeof init;
    getFulltext: typeof _getArticle;
  };
};

export const currentArticles = makeCurrentArticleStore();
