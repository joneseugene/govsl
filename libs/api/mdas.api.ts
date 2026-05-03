import { model } from '@/supabase/model';
import { shuffleArray } from '../functions';
import { MDAInterface } from '../interface/mda/mdas.interface';
import { baseQuery } from './base.api';
import { createServerSupabaseClient } from '@/supabase/server';

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

export async function getAllMDAs() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('mdas').select('id, name').order('name');

  if (error) throw new Error(error.message);

  return (data ?? []).map((m) => ({
    id: m.id,
    name: m.name,
  }));
}
