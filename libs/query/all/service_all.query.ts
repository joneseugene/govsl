import { getServiceCategoryCounts } from '@/libs/api/services.api';

export type ServiceCategory = {
  category: string;
  category_page?: string;
  count: number;
};

export const serviceAllQueryKey = ['all-service-categories'];

export async function getAllServiceCategories() {
  return getServiceCategoryCounts();
}
