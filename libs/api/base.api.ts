// lib/supabase/baseQuery.ts
import { createServerSupabaseClient } from "@/supabase/server";

type QueryOptions = {
  table: string;
  select?: string;
  filters?: Record<string, any>;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  limit?: number;
};

export async function baseQuery<T = unknown>(options: {
  table: string;
  select?: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}): Promise<T[]> {
  const supabase = await createServerSupabaseClient();

  const page = options.page ?? 1;
  const limit = options.limit ?? 5;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from(options.table)
    .select(options.select || "*")
    .range(from, to);

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query = query.eq(key, value);
      }
    });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as T[];
}
