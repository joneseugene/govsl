import { model } from '@/supabase/model';
import { NewsArticleInterface } from '../interface/news.articles.interface';
import { baseQuery } from './base.api';

type NewsRow = NewsArticleInterface & {
  created_at?: string | null;
};

export async function getNewsArticles(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<NewsRow>({
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
      mda_id: params?.ministryId,
    },
    search: params?.search,
    searchFields: ['title', 'summary', 'content'],
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
    orderBy: 'created_at',
    ascending: false,
  });

  const data: NewsArticleInterface[] = result.data.map((item) => ({
    ...item,
    date: item.date ?? item.created_at ?? undefined,
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
