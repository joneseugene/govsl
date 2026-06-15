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
  search?: string;
  searchFields?: string[];
};

type QueryResult<T> = {
  data: T[];
  total?: number;
  error?: string;
};

export async function baseQuery<T = unknown>(options: QueryOptions): Promise<QueryResult<T>> {
  try {
    const supabase = await createServerSupabaseClient();

    const page = options.page ?? 1;
    const limit = options.limit ?? 5;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from(options.table).select(options.select || '*', { count: 'exact' });

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    if (options.search?.trim() && options.searchFields && options.searchFields.length > 0) {
      const q = options.search.trim().replaceAll(',', ' ');

      const searchQuery = options.searchFields.map((field) => `${field}.ilike.%${q}%`).join(',');

      query = query.or(searchQuery);
    }

    if (options.orderBy === 'random') {
      query = query.order('id', { ascending: false });
    } else if (options.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.ascending ?? true,
      });
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('BASE QUERY ERROR:', error.message);
      throw new Error(error.message);
    }

    return {
      data: (data ?? []) as T[],
      total: count ?? 0,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error occurred';

    console.error('BASE QUERY CATCH:', message);

    return {
      data: [],
      total: 0,
      error: message,
    };
  }
}
