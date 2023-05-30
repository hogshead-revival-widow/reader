import { writable } from 'svelte/store';

const makeIsOverviewOpen = () => {
  const state = writable(false);

  const close = () => state.set(false);
  const toggle = () => state.update((currentState) => !currentState);

  return {
    subscribe: state.subscribe,
    toggle,
    close,
  };
};
export const isOverviewOpen = makeIsOverviewOpen();
