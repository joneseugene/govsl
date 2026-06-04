import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AllServicesClient from './ServiceAll.client';
import { getQueryClient } from '@/libs/functions';
import { getAllServiceCategories, serviceAllQueryKey } from '@/libs/query/all/service_all.query';

type SearchParams = {
  page?: string;
  search?: string;
  category?: string;
};

export default async function AllServicesServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);
  const search = params.search?.trim() || undefined;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: serviceAllQueryKey,
    queryFn: getAllServiceCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllServicesClient
        currentPage={safePage}
        search={search}
        category={params.category ?? 'all'}
      />
    </HydrationBoundary>
  );
}
