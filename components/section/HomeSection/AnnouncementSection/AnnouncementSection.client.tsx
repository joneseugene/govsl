'use client';

import { useRouter } from 'next/navigation';
import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { homeSections } from '@/libs/consts/home.const';
import { AnnouncementItem } from './AnnouncementItem';
import {
  announcementQueryKey,
  getHomeAnnouncementTypes,
} from '@/libs/query/home/announcement.query';
import { useQuery } from '@tanstack/react-query';

export default function AnnouncementSectionClient() {
  const router = useRouter();

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: announcementQueryKey,
    queryFn: getHomeAnnouncementTypes,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return (
    <HomeSection id={homeSections.announcement.id} className="bg-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Announcements"
          description="Explore official government notices, opportunities, and public information."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {isLoading ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Loading announcements...
          </div>
        ) : isError ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Announcements could not be loaded.
          </div>
        ) : items.length === 0 ? (
          <div className="border border-slate-100 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            No recent announcements available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {items.map((item, index) => (
              <AnnouncementItem
                key={`${item.announcement_type}-${index}`}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        <div className="mt-1 flex">
          <ViewAllButton onClick={() => router.push(homeSections.announcement.routes.all)}>
            See all Announcements
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
