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
  error?: string;
};

export async function baseQuery<T = unknown>(
  options: QueryOptions & {
    search?: string;
    ministry?: string;
  },
): Promise<QueryResult<T>> {
   try {
  const supabase = await createServerSupabaseClient();

  const page = options.page ?? 1;
  const limit = options.limit ?? 5;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from(options.table).select(options.select || '*', { count: 'exact' });

  // STANDARD FILTERS
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });
  }

  // SEARCH (push into DB instead of JS filtering)
  if (options.search) {
    const q = options.search;

    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,content.ilike.%${q}%`);
  }

  // MINISTRY FILTER
  if (options.ministry && options.ministry !== 'all') {
    query = query.eq('ministry_id', options.ministry);
  }

  // ORDERING
  if (options.orderBy === 'random') {
    query = query.order('id', { ascending: false });
  } else if (options.orderBy) {
    query = query.order(options.orderBy, {
      ascending: options.ascending ?? true,
    });
  }

  // PAGINATION (always last)
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: (data ?? []) as T[],
    total: count ?? 0,
  };
} catch (err: any) {
    // 🔥 THIS catches "fetch failed"
    return {
      data: [],
      total: 0,
      error: err?.message || 'Network error occurred',
    };
  }
}
