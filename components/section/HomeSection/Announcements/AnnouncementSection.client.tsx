'use client';

import { useRouter } from 'next/navigation';
import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { homeSections } from '@/libs/consts/home.const';
import { AnnouncementItem } from './AnnouncementItem';
import { AnnouncementTypeMappedInterface } from '@/libs/api/announcements.api';

type AnnouncementResponse =
  | AnnouncementTypeMappedInterface[]
  | {
      data?: AnnouncementTypeMappedInterface[];
    };

type Props = {
  initialData: AnnouncementResponse;
};

export default function AnnouncementSectionClient({ initialData }: Props) {
  const router = useRouter();

  const items: AnnouncementTypeMappedInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

  return (
    <HomeSection id={homeSections.announcement.id} className="bg-white">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="More on GOV.SL"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {items.length === 0 ? (
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
          <ViewAllButton
            onClick={() =>
              router.push(
                `${homeSections.announcement.routes.all}?from=%2F%23${homeSections.announcement.id}`,
              )
            }
          >
            See all Announcements
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
