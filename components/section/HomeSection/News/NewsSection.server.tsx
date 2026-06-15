import NewsArticleSectionClient from './NewsSection.client';
import { toPlain } from '@/libs/functions';
import { getHomeNewsArticles } from '@/libs/query/home/news.query';

export const revalidate = 120;

export default async function NewsSectionServer() {
  const data = await getHomeNewsArticles();

  return <NewsArticleSectionClient initialData={toPlain(data)} />;
}