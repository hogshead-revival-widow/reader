import type { ComponentProps } from 'svelte';

import type Tag from '../../components/text/Tag.svelte';
import { countNormpages } from './countNormpages';

type TTag = ComponentProps<Tag>;

export const articleToTags = (article: Article) => {
  const itemURL: TTag = {
    link: { title: 'Zur Artikel-Vollinfo', href: article.urls.item },
    content: '↗ Artikel',
  };

  const pdfURL: TTag = {
    link: { title: 'Zum PDF', href: article.urls.pdf },
    content: '↗ PDF',
  };
  const source: TTag = { content: article.source };
  const author: TTag = { content: article.author };
  const wordLength: TTag = { content: `${article.length} Wörter` };
  const normPageLength: TTag = {
    content: `~${countNormpages(article.text)} Normseiten`,
  };
  const date: TTag = { content: article.date };

  return {
    date,
    itemURL,
    pdfURL,
    source,
    author,
    wordLength,
    normPageLength,
  } as const;
};
