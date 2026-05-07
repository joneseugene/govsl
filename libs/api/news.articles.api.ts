import { model } from '@/supabase/model';
import { NewsArticleInterface } from '../interface/news.articles.interface';
import { baseQuery } from './base.api';

export async function getNewsArticles(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<NewsArticleInterface>({
    table: model.news_articles,
    select: `
      *,
      mdas (
        id,
        name,
        acronym,
        type
      )
    `,

    filters: {
      status: params?.status,
    },

    search: params?.search,

    searchFields: ['title', 'headline', 'excerpt', 'content'],

    ministry: params?.ministryId,

    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  // NORMALIZE DATE
  const data = result.data.map((item: NewsArticleInterface) => ({
    ...item,
    date: item.date ?? (item as any).created_at ?? null,
  }));

  return {
    ...result,
    data,
  };
}

export async function getNewsArticleById(id: string) {
  const result = await baseQuery<NewsArticleInterface>({
    table: model.news_articles,
    select: `*, mdas(id,name,acronym,type)`,
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}
