import type { Action } from 'svelte/action';

import { CONSTS } from '../config/consts';

export const clickOutside: Action = (node) => {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      const event = new CustomEvent(CONSTS.EVENT.click_outside, {
        detail: { node },
      });
      node.dispatchEvent(event);
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
};
