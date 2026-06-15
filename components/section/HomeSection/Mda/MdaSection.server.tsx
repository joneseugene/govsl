import MDASectionClient from './MdaSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHomeMdas, mdaQueryKey } from '@/libs/query/home/mda.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function MDASectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: mdaQueryKey,
    queryFn: async () => {
      const data = await getHomeMdas();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <MDASectionClient />
    </HydrationBoundary>
  );
}
