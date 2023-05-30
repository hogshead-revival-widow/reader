import { handleMsg } from '../lib/msg/handleMsg';
import { isOpenReaderMsg } from '../lib/msg/isMsg';
import { openReader } from '../lib/openReader';

chrome.storage.session.setAccessLevel({
  accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS',
});

handleMsg([[isOpenReaderMsg, (msg) => openReader(msg)]]);
