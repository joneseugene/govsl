import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { PublicationInterface } from '../interface/publications.interface';

export async function getPublications(params?: { status?: string; page?: number; limit?: number }) {
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
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}
