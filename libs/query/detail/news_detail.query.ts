import { getNewsArticleById } from "@/libs/api/news.articles.api";

export const newsDetailQueryKey = (id: string) => [
  "news-detail",
  id,
];

export async function getNewsDetail(id: string) {
  return getNewsArticleById(id);
}