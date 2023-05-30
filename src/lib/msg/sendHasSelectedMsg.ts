export const sendHasSelectedMsg = async (
  document: Document,
  selected: CurrentArticles,
  tabId: number
) => {
  const send = async (tabId: number | undefined, msg: Msg['hasSelected']) => {
    if (tabId === undefined)
      throw new Error('Konnte Sammmelbox-Tab nicht öffnen');
    await chrome.tabs.sendMessage(tabId, msg);
  };

  await send(tabId, {
    type: 'hasSelected',
    selected,
  });
};
