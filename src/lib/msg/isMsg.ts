const check: { [T in keyof Msg]: (value: any) => boolean } = {
  openReader: (value) =>
    typeof value === 'object' &&
    value['type'] === 'openReader' &&
    value['collectionBox'] !== undefined &&
    typeof value['collectionBox']['href'] === 'string' &&
    typeof value['collectionBox']['name'] === 'string',
  hasSelected: (value) =>
    typeof value === 'object' &&
    value['type'] === 'hasSelected' &&
    value['selected'] !== undefined &&
    Array.isArray(value['selected']),
};

export const isOpenReaderMsg = (maybeMsg: any): maybeMsg is Msg['openReader'] =>
  check['openReader'](maybeMsg);

export const isHasSelectedMsg = (
  maybeMsg: any
): maybeMsg is Msg['hasSelected'] => check['hasSelected'](maybeMsg);
