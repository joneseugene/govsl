import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AllMDAClient from './MdaAll.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getAllMdas, mdaAllQueryKey } from '@/libs/query/all/mda_all.query';

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    type?: string;
    acronym?: string;
  }>;
}

export default async function AllMDAServer({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page ?? 1) || 1);
  const search = params.search?.trim() || undefined;

  const queryClient = getQueryClient();

  const queryParams = {
    search,
  };

  await queryClient.prefetchQuery({
    queryKey: mdaAllQueryKey(queryParams),
    queryFn: async () => {
      const data = await getAllMdas(queryParams);
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <AllMDAClient
        currentPage={currentPage}
        search={search ?? ''}
        type={params.type ?? 'all'}
        acronym={params.acronym}
      />
    </HydrationBoundary>
  );
}
