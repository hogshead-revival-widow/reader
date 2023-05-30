import { CONFIG } from '../../config';

type XMLTo<T> = (xml: Document) => T;

const isArticle = (xml: Document) =>
  xml.querySelector("[name='media']")?.getElementsByTagName('tag0:value')[0]
    .innerHTML === 'Presse';

const getPDFURL: XMLTo<Article['urls']['pdf']> = (xml) => {
  const hasPDF = xml.querySelector('[category="pdf"]') !== null;
  if (!hasPDF) throw new Error('Kein PDF');
  const name = xml.getElementsByTagName('tag0:asset')[0].getAttribute('name');
  if (!name) throw new Error('Attribut/Wert nicht gefunden: name');
  const atrributes = [
    'providerId',
    'classicStationId',
    'duStation',
    'dukey',
    'mediumKey',
    'mediumStation',
  ] as const;
  const values = Object.fromEntries(
    atrributes.map((atrribute) => {
      const value = xml
        .querySelector(`[name="${atrribute}"]`)
        ?.getAttribute('value');
      if (!value) throw new Error(`Attribut/Wert nicht gefunden ${atrribute}`);
      if (atrribute !== 'mediumKey')
        return [atrribute, encodeURIComponent(value)];
      return [atrribute, `${value}`];
    })
  ) as { [K in (typeof atrributes)[number]]: string };

  return CONFIG.CS.PATHS.getPDF({ name, ...values });
};

const getFulltext: XMLTo<Article['text']> = (xml) => {
  const fulltext = xml
    .getElementById('article_content_text')
    ?.getElementsByTagName('ns4:value')[0].firstChild?.nodeValue;
  if (!fulltext) throw new Error('Kein Volltext');
  return fulltext.trim();
};

const getTitle: XMLTo<Article['title']> = (xml) => {
  const shti = xml.getElementsByTagName('ebu:mainTitle')[0]?.innerHTML;

  const sotiParent = xml.querySelector('[name="soti_title"]');
  const soti = sotiParent
    ? [
        ...new Set(
          Array.from(sotiParent.getElementsByTagName('tag0:value'))
            .map((ele) => ele?.innerHTML?.trim())
            .filter((ele) => typeof ele === 'string' && ele !== shti)
        ),
      ]
    : [];
  return {
    shti: shti ? shti.trim() : '',
    soti: soti ? soti : [],
  };
};

const getDate: XMLTo<Article['date']> = (xml) => {
  const date = xml
    .querySelector('[name="iso_date"]')
    ?.getElementsByTagName('tag0:value')[0]?.innerHTML;
  if (!date) return '';
  const parsedDate = new Date(Date.parse(date));
  return parsedDate.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getAuthor: XMLTo<Article['author']> = (xml) => {
  const author = xml.getElementsByTagName('marc:aut')[0]?.innerHTML;
  return author ? author.trim() : '';
};

const getSource: XMLTo<Article['source']> = (xml) => {
  const source = xml.getElementsByTagName('wdr:sourceName')[0]?.innerHTML;
  return source ? source.trim() : '';
};

const getLength: XMLTo<Article['length']> = (xml) => {
  const length = xml.getElementsByTagName('wdr:lengthInBytes')[0]?.innerHTML;
  return length ? parseInt(length) : 0;
};

export const xmlToArticle: (
  id: Article['id'],
  rawXMLData: string
) => Article = (id, rawXMLData) => {
  const xml = new DOMParser().parseFromString(rawXMLData, 'text/xml');
  if (!isArticle(xml)) throw new Error('Kein Pressearticle');

  const pdfURL = getPDFURL(xml);
  const itemURL = CONFIG.CS.PATHS.getItem({ id });
  const text = getFulltext(xml);
  const title = getTitle(xml);
  const author = getAuthor(xml);
  const date = getDate(xml);
  const source = getSource(xml);
  const length = getLength(xml);

  return {
    id,
    urls: {
      pdf: pdfURL,
      item: itemURL,
    },
    text,
    title,
    author,
    date,
    source,
    length,
  };
};
