import { getNewsArticles } from '@/libs/api/news.articles.api';
import NewsArticleSectionClient from './NewsSection.client';

export default async function NewsSectionServer() {
  const news = await getNewsArticles();

  return <NewsArticleSectionClient news={news} />;
}
