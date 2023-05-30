export const getCollectionBoxTabId = async () => {
  const url = new URL(document.location.href).searchParams.get('href');
  if (url === null) throw new Error('Konnte Sammmelbox-Tab-URL nicht lesen');
  const sentToTabUrl = JSON.parse(url);
  const [tab] = await chrome.tabs.query({ url: sentToTabUrl });
  if (!tab?.id) throw new Error('Konnte Sammelbox-Tab-ID nicht lesen');
  return tab.id;
};
