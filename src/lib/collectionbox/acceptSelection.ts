import { CONSTS } from '../../config/consts';

export const acceptSelection = (msg: Msg['hasSelected']) => {
  const currentlyChecked: HTMLInputElement[] = Array.from(
    document.querySelectorAll(CONSTS.SELECTORS.currentSelectedArticles)
  );
  currentlyChecked.forEach((checkbox) => checkbox.click());

  setTimeout(() => {
    msg.selected.forEach((id) => {
      const selector = CONSTS.SELECTORS.checkboxTemplate.replace('{id}', id);
      const ele: HTMLElement | null = document.querySelector(selector);
      if (!ele) throw new Error(`Checkbox mit ID ${id} nicht gefunden`);
      ele.click();
    });
  }, 250);
};
