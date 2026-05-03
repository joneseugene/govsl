import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { PressReleaseInterface } from '../interface/press.releases.interface';

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
    ministry: params?.ministryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  return result;
}
