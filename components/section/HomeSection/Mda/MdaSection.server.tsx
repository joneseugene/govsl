import MDASectionClient from './MdaSection.client';
import { getQueryClient } from '@/libs/functions';
import { getHomeMdas, mdaQueryKey } from '@/libs/query/home/mda.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function MDASectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: mdaQueryKey,
    queryFn: getHomeMdas,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MDASectionClient />
    </HydrationBoundary>
  );
}
