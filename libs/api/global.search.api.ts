import { createServerSupabaseClient } from '@/supabase/server';
import { baseQuery } from './base.api';
import { createClient } from '@/supabase/client';

// Global Search
export async function globalSearch(search: string) {
  const supabase = await createServerSupabaseClient();

  // 1. Full-text search (fast + indexed)
  const { data: ftsData } = await supabase
    .from('global_search_view')
    .select('*')
    .textSearch('search_vector', search, {
      type: 'plain',
    })
    .limit(10);

  // 2. Fuzzy search (typo tolerance)
  const { data: fuzzyData } = await supabase.rpc('fuzzy_global_search', {
    q: search,
  });

  // 3. Merge + deduplicate
  const merged = [...(ftsData ?? []), ...(fuzzyData ?? [])];

  const unique = Array.from(new Map(merged.map((item) => [item.id, item])).values());

  return { data: unique.slice(0, 10) };
}

// Suggestions
export async function getSearchSuggestions(search: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from('global_search_view')
    .select('id, title, type, link, acronym, ministry')
    .textSearch('search_vector', search, {
      type: 'phrase',
    })
    .limit(8);

  return data ?? [];
}

// Last Updated
export async function getLastUpdatedDate() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('global_search_view')
    .select('created_at')
    .not('created_at', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data?.created_at) return null;

  return data.created_at;
}
