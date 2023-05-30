import { type Writable, writable } from 'svelte/store';

export const currentArticleId: Writable<Article['id'] | undefined> = writable();
