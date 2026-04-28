'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { MoreItem } from './MoreItem';
import { AnnouncementInterface } from '@/libs/interface/announcements.interface';
import { useRouter } from 'next/navigation';

export default function MoreSectionClient({ items }: { items: AnnouncementInterface[] }) {
  const router = useRouter();

  return (
    <>
      <HomeSection id={homeSections.more.id}>
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <SectionHeading level="h2" title="More on GOV.SL" />
          {/* Grid Layout */}
          <div
            className="
                        grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2
                        gap-1 sm:gap-4 lg:gap-6
                    "
          >
            {items.map((item, index) => (
              <MoreItem key={index} item={item} onNavigate={(path) => router.push(path)} />
            ))}
          </div>
        </div>
      </HomeSection>
    </>
  );
}
