import AnnouncementSectionClient from './AnnouncementSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import {
  announcementQueryKey,
  getHomeAnnouncementTypes,
} from '@/libs/query/home/announcement.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AnnouncementSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: announcementQueryKey,
    queryFn: async () => {
      const data = await getHomeAnnouncementTypes();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <AnnouncementSectionClient />
    </HydrationBoundary>
  );
}
