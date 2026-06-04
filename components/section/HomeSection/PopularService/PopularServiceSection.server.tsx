import { getServices } from '@/libs/api/services.api';
import PopularServicesSectionClient from './PopularServiceSection.client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/libs/functions';
import { getHomePopularServices, popularServicesQueryKey } from '@/libs/query/home/service.query';

export default async function PopularServicesSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: popularServicesQueryKey,
    queryFn: getHomePopularServices,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PopularServicesSectionClient />
    </HydrationBoundary>
  );
}
