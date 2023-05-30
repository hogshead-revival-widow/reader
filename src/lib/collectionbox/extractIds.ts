import { CONSTS } from '../../config/consts';

const extractIds = (
  document: Document,
  mapper: (e: Element) => string | undefined | null,
  selector: string
) =>
  [
    ...new Set(
      Array.from(document.querySelectorAll(selector))
        .map(mapper)
        .filter((ele) => typeof ele === 'string')
    ),
  ] as CurrentArticles;

export const getCurrentArticles = (document: Document) =>
  extractIds(
    document,
    (element) => element?.getAttribute('id'),
    CONSTS.SELECTORS.currentArticles
  );

export const getCurrentSelectedArticles = (document: Document) =>
  extractIds(
    document,
    (element) => element?.getAttribute('id')?.replace('checkbox-', ''),
    CONSTS.SELECTORS.currentSelectedArticles
  );
