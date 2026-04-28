import { getAnnouncements } from '@/libs/api/announcements.api';
import MoreSectionClient from './MoreSection.client';

export default async function MoreSectionServer() {
  const announcements = await getAnnouncements();

  const filtered = announcements.filter(
    (item) => item.announcement_type === 'notice' || item.announcement_type === 'vacancy',
  );

  return <MoreSectionClient items={filtered} />;
}
