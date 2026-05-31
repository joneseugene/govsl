'use client';

import { useRouter } from 'next/navigation';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';

import { homeSections } from '@/libs/consts/home.const';

import { AnnouncementItem } from './AnnouncementItem';

import { AnnouncementTypeMappedInterface } from '@/libs/api/announcements.api';

export default function AnnouncementSectionClient({
  items,
}: {
  items: AnnouncementTypeMappedInterface[];
}) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.announcement.id}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <SectionHeading
          level="h2"
          title="Announcements"
          description="Explore official government notices, opportunities, and public information"
        />

        {/* Grid */}
        <div
          className="
            grid grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {items.map((item) => (
            <AnnouncementItem
              key={item.announcement_type}
              item={item}
              onNavigate={(path) => router.push(path)}
            />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
