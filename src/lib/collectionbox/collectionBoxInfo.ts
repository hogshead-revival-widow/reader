import { CONSTS } from '../../config/consts';
import { getCurrentArticles, getCurrentSelectedArticles } from './extractIds';

export const sendOpenReaderMsg = async (document) => {
  const msg = {
    type: 'openReader',
    collectionBox: getCollectionBoxInfo(document, 'fromCollection'),
  } as Msg['openReader'];
  const response = await chrome.runtime.sendMessage(msg);
  console.log({ sentCollectionBoxInfo: response });
};

export const makeCollectionBoxURL = (url: URL, msg: Msg['openReader']) => {
  Object.keys(msg.collectionBox).forEach((param) =>
    url.searchParams.set(param, JSON.stringify(msg['collectionBox'][param]))
  );
  console.log('mm', { url, msg });
  return url;
};

const getCollectionBoxInfoFromURL = (document: Document) => {
  const url = new URL(document.location.href);

  const neededParams: [
    keyof Msg['openReader']['collectionBox'],
    keyof Msg['openReader']['collectionBox'],
    keyof Msg['openReader']['collectionBox'],
    keyof Msg['openReader']['collectionBox']
  ] = ['name', 'href', 'articles', 'selected'];

  const hasParams = neededParams.every(
    (param) => url.searchParams.get(param) !== null
  );
  if (!hasParams) console.log('Konnte Collectionbox-Daten nicht lesen');

  return Object.fromEntries(
    neededParams.map((param) => [
      param,
      // @ts-expect-error
      JSON.parse(url.searchParams.get(param)),
    ])
  ) as Msg['openReader']['collectionBox'];
};

const getCollectionBoxInfoFromCollection = (document: Document) => {
  const name = document.querySelector(CONSTS.SELECTORS.name)?.innerHTML;
  const href = document.location.href;
  const articles = getCurrentArticles(document);
  const selected = getCurrentSelectedArticles(document);
  const errorMsg = `Konnte Collectionboxdaten nicht auslesen, gefunden: ${{
    articles,
    href,
    name,
    selected,
  }}`;
  if (!name || href.length < 1) throw new Error(errorMsg);

  return {
    name,
    href,
    articles,
    selected,
  } as Msg['openReader']['collectionBox'];
};
export const getCollectionBoxInfo = (
  document: Document,
  type: 'fromURL' | 'fromCollection'
) => {
  if (type === 'fromURL') return getCollectionBoxInfoFromURL(document);
  return getCollectionBoxInfoFromCollection(document);
};
