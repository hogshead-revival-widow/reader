import type { FlyParams } from 'svelte/transition';

import { BASE_URL } from './cs';

const EVENT: Record<keyof CustomEventMap, keyof CustomEventMap> = {
  click_outside: 'click_outside',
} as const;

const SELECTORS = {
  currentArticles: '#search-results-list li.PRESSE:not(.subitem)',
  currentSelectedArticles:
    'li.PRESSE:not(.subitem) input[type="checkbox"][id*="checkbox-"]:checked',
  checkboxTemplate:
    'li.PRESSE:not(.subitem) input[type="checkbox"][id*="checkbox-{id}"]',
  allArticleCheckboxes: 'li.PRESSE:not(.subitem) input[type="checkbox"]',
  startButtonContainer: '.sb-edit-buttons',
  name: '.sb-overview h2',
} as const;

const EXTENSION = {
  PATHS: {
    CONTENT: 'src/entry/content.ts',
    BACKGROUND: 'src/entry/background.ts',
    POPUP: 'src/entry/popup.html',
  },
} as const;

const _DURATION = 500 as const;
const _DELAY = 250 as const;
const _POSITION = 15 as const;

// Zeige "Lade..."-Einblendung erst nach `LOADER_DELAY` (in Milisekunden)
const LOADER_DELAY = _DURATION; // ms

const ANIMATION = {
  LIST_ITEM_REMOVED: { x: -_POSITION } as FlyParams,
  ARTICLE_IN_RIGHT: {
    delay: _DELAY,
    x: _POSITION,
    duration: _DURATION,
  } as FlyParams,
  ARTICLE_IN_LEFT: {
    delay: _DELAY,
    x: -_POSITION,
    duration: _DURATION,
  } as FlyParams,
} as const;

const WARNING_THRESHOLD_ARTICLE_AMOUNT = 15 as const;

const PLACEHOLDER_ARTICLE: Article = {
  author: '',
  date: '',
  id: '_placeholder',
  length: 0,
  source: '',
  text: '',
  urls: {
    item: '',
    pdf: '',
  },
  title: {
    shti: '',
    soti: [],
  },
};

const HOTKEYS = {
  SELECT: 'Enter',
  ACCEPT: 'Shift',
  TOGGLE_OVERVIEW: 'Alt',
  RESET: 'Backspace',
} as const;

const INTERFACE = {
  PLACEHOLDER_ARTICLE,
  WARNING_THRESHOLD_ARTICLE_AMOUNT,
  ANIMATION,
  LOADER_DELAY,
  HOTKEYS,
} as const;

export const CONSTS = {
  EVENT,
  SELECTORS,
  EXTENSION,
  INTERFACE,
  BASE_URL,
} as const;
