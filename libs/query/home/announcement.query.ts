import {
  getAnnouncementTypes,
  AnnouncementTypeMappedInterface,
} from '@/libs/api/announcements.api';

export const announcementQueryKey = ['home-announcement-types'];

export async function getHomeAnnouncementTypes(): Promise<AnnouncementTypeMappedInterface[]> {
  const items = await getAnnouncementTypes();

  return [
    ...items,
    {
      announcement_type: 'all',
      total: items.reduce((acc, item) => acc + item.total, 0),
      title: 'All Announcements',
      description: 'Browse complete announcement archive',
      route: '/announcement',
    },
  ];
}
