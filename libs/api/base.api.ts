import { createServerSupabaseClient } from '@/supabase/server';

type QueryOptions = {
  table: string;
  select?: string;
  filters?: Record<string, unknown>;
  orderBy?: string | 'random';
  ascending?: boolean;
  page?: number;
  limit?: number;
};

export async function baseQuery<T = unknown>(options: QueryOptions): Promise<T[]> {
  const supabase = await createServerSupabaseClient();

  const page = options.page ?? 1;
  const limit = options.limit ?? 5;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from(options.table).select(options.select || '*');

  // Apply filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });
  }

  // Apply ordering
  if (options.orderBy === 'random') {
    query = query.order('random');
  } else if (options.orderBy) {
    query = query.order(options.orderBy, {
      ascending: options.ascending ?? true,
    });
  }

  // Apply pagination
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as T[];
}
