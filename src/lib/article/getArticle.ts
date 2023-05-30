import { fetchXML } from './fetchXML';
import { xmlToArticle } from './xmlToArticle';

export const getArticle = async (
  id: Article['id'],
  cache: ArticleCache = []
) => {
  const cachedArticle = cache.find((article) => article.id === id);
  if (cachedArticle !== undefined) {
    console.log('nutze cache für', { id }, { cache });
    return { article: cachedArticle, cached: true };
  }
  const xml = await fetchXML(id);
  const article = xmlToArticle(id, xml);
  console.log('neu gefetcht');
  return { article, cached: false };
};
