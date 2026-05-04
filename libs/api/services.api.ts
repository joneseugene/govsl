import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { ServicesInterface } from '../interface/service/services.interface';
import { createServerSupabaseClient } from '@/supabase/server';

export async function getServices(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<ServicesInterface>({
    table: model.services,
    select: '*',
    filters: {
      status: params?.status,
    },
    search: params?.search,
    ministry: params?.ministryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  return result;
}

export async function getServiceById(id: string) {
  const result = await baseQuery<ServicesInterface>({
    table: model.services,
    select: '*',
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}

// Service Count By Category
export type ServiceCategoryCount = {
  category: string;
  category_page?: string;
  count: number;
};

function isServiceCategoryRow(
  item: unknown,
): item is { category?: string; category_page?: string } {
  return typeof item === 'object' && item !== null;
}

export async function getServiceCategoryCounts(params?: { status?: string; ministryId?: string }) {
  try {
    const supabase = await createServerSupabaseClient();

    let query = supabase.from(model.services).select('category, category_page');

    if (params?.status) {
      query = query.eq('status', params.status);
    }

    if (params?.ministryId && params.ministryId !== 'all') {
      query = query.eq('ministry_id', params.ministryId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    const grouped: Record<string, { count: number; category_page?: string }> = {};

    (data ?? []).forEach((item: unknown) => {
      if (!isServiceCategoryRow(item)) return;

      const category = item.category ?? 'uncategorized';
      const page = item.category_page;

      if (!grouped[category]) {
        grouped[category] = {
          count: 1,
          category_page: page,
        };
      } else {
        grouped[category].count += 1;

        if (!grouped[category].category_page && page) {
          grouped[category].category_page = page;
        }
      }
    });

    const result: ServiceCategoryCount[] = Object.entries(grouped).map(([category, value]) => ({
      category,
      category_page: value.category_page,
      count: value.count,
    }));

    result.sort((a, b) => b.count - a.count);

    return {
      data: result,
      total: result.length,
    };
  } catch (err: unknown) {
    return {
      data: [],
      total: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
