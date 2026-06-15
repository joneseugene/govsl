import PopularServicesSectionClient from './PopularServiceSection.client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHomePopularServices, popularServicesQueryKey } from '@/libs/query/home/service.query';

export default async function PopularServicesSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: popularServicesQueryKey,
    queryFn: async () => {
      const data = await getHomePopularServices();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <PopularServicesSectionClient />
    </HydrationBoundary>
  );
}
