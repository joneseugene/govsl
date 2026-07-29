import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { PressReleaseInterface } from '../interface/press.releases.interface';
import { toPlain } from '../functions';

export async function getPressReleases(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<PressReleaseInterface>({
    table: model.press_releases,
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
    searchFields: ['title', 'description', 'legacy_id'],
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
    orderBy: 'created_at',
    ascending: false,
  });

  return toPlain({
    data: result.data ?? [],
    total: result.total ?? 0,
  });
}

export async function getPressReleaseById(id: string) {
  const result = await baseQuery<PressReleaseInterface>({
    table: model.press_releases,
    select: `*, mdas(id,name,acronym,type)`,
    filters: { id },
    limit: 1,
    page: 1,
  });

  return toPlain(result.data?.[0] ?? null);
}
