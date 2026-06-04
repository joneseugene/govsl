import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ServiceDetailUI from '@/components/section/DetailSection/Service/ServiceDetail';
import { getQueryClient } from '@/libs/functions';
import { getServiceDetail, serviceDetailQueryKey } from '@/libs/query/detail/service_detail.query';

interface Props {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: serviceDetailQueryKey(id),
    queryFn: () => getServiceDetail(id),
  });

  const service = queryClient.getQueryData(serviceDetailQueryKey(id)) as Awaited<
    ReturnType<typeof getServiceDetail>
  >;

  if (!service?.id) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServiceDetailUI id={id} slug={slug} />
    </HydrationBoundary>
  );
}
