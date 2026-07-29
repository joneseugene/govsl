import { model } from '@/supabase/model';
import { MDAInterface } from '../interface/mda/mdas.interface';
import { baseQuery } from './base.api';

export async function getMdas(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  return baseQuery<MDAInterface>({
    table: model.mdas,
    select: '*',
    filters: {
      status: params?.status,
    },
    search: params?.search,
    page: params?.page ?? 1,
    limit: params?.limit ?? 10,
  });
}

export async function getMDAOptions() {
  const result = await baseQuery<MDAInterface>({
    table: model.mdas,
    select: 'id,name',
    page: 1,
    limit: 1000,
  });

  return result.data;
}

export async function getMDAById(id: string) {
  const result = await baseQuery<MDAInterface>({
    table: model.mdas,
    select: '*',
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}
