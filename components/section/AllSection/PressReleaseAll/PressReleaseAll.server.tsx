import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import PressReleasesAllClient from './PreaseReleaseAll.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import {
  getAllPressReleases,
  getPressReleaseMdaOptions,
  pressReleaseAllQueryKey,
  pressReleaseMdaOptionsQueryKey,
} from '@/libs/query/all/press_release_all.query';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function AllPressReleasesSectionServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);
  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministryId && params.ministryId !== 'all' ? params.ministryId : undefined;

  const queryClient = getQueryClient();

  const queryParams = {
    page: safePage,
    search,
    ministryId,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: pressReleaseAllQueryKey(queryParams),
      queryFn: async () => {
        const data = await getAllPressReleases(queryParams);
        return toPlain(data);
      },
    }),

    queryClient.prefetchQuery({
      queryKey: pressReleaseMdaOptionsQueryKey,
      queryFn: async () => {
        const data = await getPressReleaseMdaOptions();
        return toPlain(data);
      },
    }),
  ]);

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <PressReleasesAllClient
        currentPage={safePage}
        search={search}
        ministryId={params.ministryId ?? 'all'}
      />
    </HydrationBoundary>
  );
}
