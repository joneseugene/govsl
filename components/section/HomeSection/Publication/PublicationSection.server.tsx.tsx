import PublicationSectionClient from './PublicationSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHomePublications, publicationQueryKey } from '@/libs/query/home/publication.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function PublicationSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: publicationQueryKey,
    queryFn: async () => {
      const data = await getHomePublications();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <PublicationSectionClient />
    </HydrationBoundary>
  );
}
