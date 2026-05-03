import { model } from '@/supabase/model';
import { shuffleArray } from '../functions';
import { MDAInterface } from '../interface/mda/mdas.interface';
import { baseQuery } from './base.api';

export async function getMdas(params?: { status?: string; limit?: number }) {
  const { data } = await baseQuery<MDAInterface>({
    table: model.mdas,
    select: '*',
    filters: {
      status: params?.status,
    },
    limit: 50,
  });

  return shuffleArray(data).slice(0, params?.limit ?? 5);
}
