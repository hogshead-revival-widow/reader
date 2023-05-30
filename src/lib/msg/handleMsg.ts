type MsgHandler = Parameters<
  chrome.runtime.ExtensionMessageEvent['addListener']
>[0];

type MsgCondition = [(msg) => boolean, MsgHandler];

export const handleMsg = (conditions: MsgCondition[]) => {
  const handle = (msg, sender, sendResponse, condition) => {
    const [test, run] = condition;
    if (!test(msg)) return;
    console.log({ received_expected_msg: msg });
    return run(msg, sender, sendResponse);
  };

  const messageHandler: MsgHandler = (msg, sender, sendResponse) =>
    conditions.forEach((condition) =>
      handle(msg, sender, sendResponse, condition)
    );

  chrome.runtime.onMessage.addListener(messageHandler);
};
