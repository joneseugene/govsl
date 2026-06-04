import AnnouncementSectionClient from './AnnouncementSection.client';
import { getQueryClient } from '@/libs/functions';
import { announcementQueryKey, getHomeAnnouncementTypes } from '@/libs/query/home/announcement.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AnnouncementSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: announcementQueryKey,
    queryFn: getHomeAnnouncementTypes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnnouncementSectionClient />
    </HydrationBoundary>
  );
}
