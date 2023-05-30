import { CONFIG } from '../../config';

export const fetchXML = async (articleId: Article['id']) => {
  try {
    const url = CONFIG.CS.PATHS.getXML({ id: articleId });
    const response = await fetch(url);
    if (response.ok) {
      const xml = await response.text();
      console.log({ xml });
      return xml;
    }
    throw new Error(`Fail: Fetching: ${url} (${response.statusText})`);
  } catch (error) {
    const msg = `Fetch NICHT erfolgreich, vgl. Fehler (Details, Fehler: ${JSON.stringify(
      error instanceof Error ? error.message : error
    )}))`;
    throw new Error(msg);
  }
};
