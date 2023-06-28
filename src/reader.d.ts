type Context = 'search' | 'collectionbox';

type ClickOutside = { node: HTMLElement };

interface CustomEventMap {
  click_outside: CustomEvent<ClickOutside>;
}

interface IHotkey {
  key: string;
  label: string;
  title: string;
  action: () => void;
  ignoreHotkeyIfOverviewIsOpen?: true;
  fillButtonIfCurrentArticleIsSelected?: true;
  dependsOnHasSelected?: true;
  isDestructive?: true;
}

type Article = {
  id: string;
  urls: {
    pdf: string;
    item: string;
  };
  text: string;
  title: {
    shti: string; // ebu:mainTitle
    soti: string[]; // soti_title
  };
  author: string; // marc:aut
  date: string; // dc:date
  source: string; // wdr:sourceName
  length: number; // wdr:lengthInBytes
};

type ArticleChangeMode = number | 'next' | 'previous';

type ArticleCache = ReadonlyArray<Article>;

type CurrentArticles = ReadonlyArray<Article['id']>;

type Msg = Readonly<{
  openReader: {
    type: 'openReader';
    collectionBox: {
      name: string;
      href: string;
      articles: CurrentArticles;
      selected: CurrentArticles;
    };
  };
  hasSelected: {
    type: 'hasSelected';
    selected: CurrentArticles;
  };
}>;

interface Document {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Document, e: CustomEventMap[K]) => void
  ): void;
  dispatchEvent<K extends keyof CustomEventMap>(e: CustomEventMap[K]): void;
}

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:click_outside'?: (event: CustomEvent<ClickOutside>) => any;
  }
}
