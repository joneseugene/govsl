import AnnouncementSectionClient from './AnnouncementSection.client';
import { toPlain } from '@/libs/functions';
import { getHomeAnnouncementTypes } from '@/libs/query/home/announcement.query';

export const revalidate = 120;

export default async function AnnouncementSectionServer() {
  const data = await getHomeAnnouncementTypes();

  return <AnnouncementSectionClient initialData={toPlain(data)} />;
}