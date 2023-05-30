import { crx } from '@crxjs/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import { MANIFEST as manifest } from './src/config';

// @ts-expect-error
const srcDir = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  resolve: {
    alias: {
      src: srcDir,
    },
  },
});
