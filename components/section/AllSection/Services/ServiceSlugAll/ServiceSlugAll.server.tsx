import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ServicesSlugClient from './ServiceSlugAll.cllient';
import { getQueryClient } from '@/libs/functions';
import {
  getServiceCategoryBySlug,
  serviceSlugQueryKey,
} from '@/libs/query/all/service_all_slug.query';

interface Props {
  categoryPage: string;
}

export default async function ServiceSlugServer({ categoryPage }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: serviceSlugQueryKey({
      categoryPage,
    }),
    queryFn: () =>
      getServiceCategoryBySlug({
        categoryPage,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicesSlugClient categoryPage={categoryPage} />
    </HydrationBoundary>
  );
}
