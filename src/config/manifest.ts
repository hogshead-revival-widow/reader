import type { ManifestV3Export } from '@crxjs/vite-plugin';

import pkg from './../../package.json';
import { CONSTS } from './consts';

export const MANIFEST: ManifestV3Export = {
  name: pkg.name,
  description: pkg.description,
  version: new Date()
    .toISOString()
    .replace(/:/g, '')
    .replace(/[-T]/g, '.')
    .slice(0, 15),
  manifest_version: 3,
  content_scripts: [
    {
      matches: [`*://${CONSTS.BASE_URL.hostname}/striata/collectionbox*`],
      js: [CONSTS.EXTENSION.PATHS.CONTENT],
      run_at: 'document_end',
    },
  ],
  permissions: ['storage', 'tabs'],
  background: {
    service_worker: CONSTS.EXTENSION.PATHS.BACKGROUND,
  },
  action: {
    default_popup: CONSTS.EXTENSION.PATHS.POPUP,
  },
};
