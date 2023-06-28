import { CONSTS } from '../config/consts';
import { closeReader } from './closeReader';
import { isOverviewOpen, selectedArticles } from './stores/index.js';

export const HOTKEYS: Record<
  'ACCEPT' | 'SELECT' | 'TOGGLE_OVERVIEW' | 'RESET',
  IHotkey
> = {
  SELECT: {
    key: CONSTS.INTERFACE.HOTKEYS.SELECT,
    label: '⏎',
    title: 'Artikel auswählen',
    fillButtonIfCurrentArticleIsSelected: true,
    action: selectedArticles.toggleCurrentArticle,
  },
  ACCEPT: {
    key: CONSTS.INTERFACE.HOTKEYS.ACCEPT,
    dependsOnHasSelected: true,
    label: '↗ CS',
    title: 'Ausgewählte Artikel in CS übernehmen',
    action: closeReader,
  },
  TOGGLE_OVERVIEW: {
    key: CONSTS.INTERFACE.HOTKEYS.TOGGLE_OVERVIEW,
    dependsOnHasSelected: true,
    label: '📋',
    ignoreHotkeyIfOverviewIsOpen: true,
    title: 'Überblick (ausgewählte Artikel)',
    action: isOverviewOpen.toggle,
  },
  RESET: {
    key: CONSTS.INTERFACE.HOTKEYS.RESET,
    dependsOnHasSelected: true,
    isDestructive: true,
    label: '⌫',
    title: 'Auswahl zurücksetzen',
    action: selectedArticles.reset,
  },
} as const;
