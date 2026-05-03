import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { PressReleaseInterface } from '../interface/press.releases.interface';

export async function getPressReleases(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministry?: string;
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
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  let data = result.data;

  // SEARCH FILTER
  if (params?.search) {
    const q = params.search.toLowerCase();

    data = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q) ||
        item.mdas?.name?.toLowerCase().includes(q),
    );
  }

  // MINISTRY FILTER
  if (params?.ministry && params.ministry !== 'all') {
    data = data.filter((item) => item.mdas?.name === params.ministry);
  }

  return {
    data,
    total: result.total,
  };
}
