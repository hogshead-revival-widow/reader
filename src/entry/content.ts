import StartButton from '../components/StartButton.svelte';
import { CONSTS } from '../config/consts';
import { acceptSelection } from '../lib/collectionbox/acceptSelection';
import { handleMsg } from '../lib/msg/handleMsg';
import { isHasSelectedMsg } from '../lib/msg/isMsg';

const load = (isReady: boolean, document: Document) => {
  if (!isReady)
    return window.addEventListener('load', () => load(true, document));

  const container = document.querySelector(
    CONSTS.SELECTORS.startButtonContainer
  );
  if (!container) throw new Error('Positionierung StartButton gescheitert');
  new StartButton({ target: container });
};

const isReady = document.readyState === 'complete';

load(isReady, document);

handleMsg([[isHasSelectedMsg, (msg) => acceptSelection(msg)]]);
