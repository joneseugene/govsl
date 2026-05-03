import { createServerSupabaseClient } from '@/supabase/server';

type QueryOptions = {
  table: string;
  select?: string;
  filters?: Record<string, unknown>;
  orderBy?: string | 'random';
  ascending?: boolean;
  page?: number;
  limit?: number;
  withCount?: boolean;
};

type QueryResult<T> = {
  data: T[];
  total?: number;
};

export async function baseQuery<T = unknown>(options: QueryOptions): Promise<QueryResult<T>> {
  const supabase = await createServerSupabaseClient();

  const page = options.page ?? 1;
  const limit = options.limit ?? 5;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from(options.table).select(options.select || '*', { count: 'exact' });

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });
  }

  // Ordering
  if (options.orderBy === 'random') {
    query = query.order('id', { ascending: false });
  } else if (options.orderBy) {
    query = query.order(options.orderBy, {
      ascending: options.ascending ?? true,
    });
  }

  // Pagination
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as T[],
    total: count ?? 0,
  };
}
