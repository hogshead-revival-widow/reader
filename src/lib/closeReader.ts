import { get } from 'svelte/store';

import { getCollectionBoxTabId } from './collectionbox/getCollectionBoxTabId';
import { sendHasSelectedMsg } from './msg/sendHasSelectedMsg';
import { selectedArticles } from './stores';

export const closeReader = async () => {
  const collectionBoxTabId = await getCollectionBoxTabId();
  await sendHasSelectedMsg(
    document,
    [...get(selectedArticles)],
    collectionBoxTabId
  );
  const currentTab = await chrome.tabs.getCurrent();
  chrome.tabs.update(collectionBoxTabId, { active: true });
  if (currentTab && currentTab?.id) await chrome.tabs.remove(currentTab.id);
};
