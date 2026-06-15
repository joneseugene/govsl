import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ServicesSlugClient from './ServiceSlugAll.cllient';
import { getQueryClient, toPlain } from '@/libs/functions';
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
    queryFn: async () => {
      const data = await getServiceCategoryBySlug({
        categoryPage,
      });

      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <ServicesSlugClient categoryPage={categoryPage} />
    </HydrationBoundary>
  );
}
