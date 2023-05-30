import { CONFIG } from '../config';
import { makeCollectionBoxURL } from './collectionbox/collectionBoxInfo';

export const openReader = async (msg: Msg['openReader']) => {
  const popup = makeCollectionBoxURL(
    new URL(chrome.runtime.getURL(CONFIG.CONSTS.EXTENSION.PATHS.POPUP)),
    msg
  );
  console.log(`Öffne popup: ${popup.href}`);
  const tabs = await chrome.tabs.query({ url: popup.href });
  if (tabs.length > 0 && tabs[0]?.id !== undefined)
    return await chrome.tabs.update(tabs[0].id, { active: true });
  return await chrome.tabs.create({ url: popup.href });
};
