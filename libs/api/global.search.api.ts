import { baseQuery } from "./base.api";

// Global Search
export async function globalSearch(search: string) {
  return baseQuery({
    table: 'global_view', // or a VIEW combining news, press-releases, announcements, appointments, publications and reports, services, mdas' etc.
    search,
    searchFields: ['title', 'name', 'content', 'summary', 'minister', 'acronym'],
    limit: 10,
    orderBy: 'created_at',
    ascending: false,
  });
}

// Suggestions
export async function getSearchSuggestions(search: string) {
  return baseQuery({
    table: 'global_view',
    search,
    searchFields: ['title', 'name'],
    limit: 8,
    orderBy: 'created_at',
    ascending: false,
  });
}

// Last Updated
export async function getLastUpdatedDate() {
  const res = await baseQuery<{ created_at: string }>({
    table: 'global_view',
    select: 'created_at',
    limit: 1,
    orderBy: 'created_at',
    ascending: false,
  });

  if (!res.data.length) {
    return null;
  }

  return res.data[0].created_at;
}