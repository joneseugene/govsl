import { getNewsArticles } from '@/libs/api/news.articles.api';

export const newsQueryKey = ['home-news-articles'];

export async function getHomeNewsArticles() {
  return getNewsArticles();
}
