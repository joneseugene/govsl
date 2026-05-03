import { model } from '@/supabase/model';
import { shuffleArray } from '../functions';
import { MDAInterface } from '../interface/mda/mdas.interface';
import { baseQuery } from './base.api';

export async function getMdas(params?: {
  status?: string;
  limit?: number;
  search?: string;
}) {
  const result = await baseQuery<MDAInterface>({
    table: model.mdas,
    select: '*',
    filters: {
      status: params?.status,
    },
    search: params?.search,
    page: 1,
    limit: 50,
  });

  return shuffleArray(result.data).slice(0, params?.limit ?? 5);
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