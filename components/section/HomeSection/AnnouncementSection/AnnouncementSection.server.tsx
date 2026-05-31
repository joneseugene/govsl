import {
  getAnnouncementTypes,
  AnnouncementTypeMappedInterface,
} from '@/libs/api/announcements.api';
import AnnouncementSectionClient from './AnnouncementSection.client';

export default async function AnnouncementSectionServer() {
  const items = await getAnnouncementTypes();

  const data: AnnouncementTypeMappedInterface[] = [
    ...items,

    {
      announcement_type: 'all',
      total: items.reduce((acc, item) => acc + item.total, 0),
      title: 'All Announcements',
      description: 'Browse complete announcement archive',
      route: '/announcement',
    },
  ];

  return <AnnouncementSectionClient items={data} />;
}
