import { getServicesByCategorySlug } from '@/libs/api/services.api';

export type ServiceSlugParams = {
  categoryPage: string;
};

export const serviceSlugQueryKey = (params: ServiceSlugParams) => [
  'service-category-slug',
  params.categoryPage,
];

export async function getServiceCategoryBySlug(params: ServiceSlugParams) {
  return getServicesByCategorySlug({
    categoryPage: params.categoryPage,
  });
}
