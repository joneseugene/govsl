import { model } from "@/supabase/model";
import { NewsArticleInterface } from "../interface/news.articles.interface";
import { baseQuery } from "./base.api";

export async function getNewsArticles(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<NewsArticleInterface>({
    table: model.news_articles,
    select: "*",
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}