// libs/api/publications.api.ts
import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { PublicationInterface } from '../interface/publications.interface';

export async function getPublications(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
  category?: string;
}) {
  return baseQuery<PublicationInterface>({
    table: model.publications,
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
      status: params?.status ?? 'published',
      mda_id: params?.ministryId,
      category: params?.category,
    },
    search: params?.search,
    searchFields: ['title', 'description', 'content'],
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}

export async function getPublicationById(id: string) {
  const result = await baseQuery<PublicationInterface>({
    table: model.publications,
    select: `*, mdas(id,name,acronym,type)`,
    filters: { id, status: 'published' },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}
