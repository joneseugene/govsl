import PublicationSectionClient from './PublicationSection.client';
import { getQueryClient } from '@/libs/functions';
import { getHomePublications, publicationQueryKey } from '@/libs/query/home/publication.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function PublicationSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: publicationQueryKey,
    queryFn: getHomePublications,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicationSectionClient />
    </HydrationBoundary>
  );
}
