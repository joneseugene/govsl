import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import MdaDetailPage from './MDADetail.client';
import { getQueryClient } from '@/libs/functions';
import {
  getMdaDetail,
  getRelatedMdas,
  mdaDetailQueryKey,
  relatedMdaQueryKey,
} from '@/libs/query/detail/mda_detail.query';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: mdaDetailQueryKey(id),
      queryFn: () => getMdaDetail(id),
    }),

    queryClient.prefetchQuery({
      queryKey: relatedMdaQueryKey(id),
      queryFn: () => getRelatedMdas(id),
    }),
  ]);

  const mda = queryClient.getQueryData(mdaDetailQueryKey(id)) as Awaited<
    ReturnType<typeof getMdaDetail>
  >;

  if (!mda) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MdaDetailPage id={id} />
    </HydrationBoundary>
  );
}
