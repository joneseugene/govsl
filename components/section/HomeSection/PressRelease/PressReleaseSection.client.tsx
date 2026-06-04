'use client';

import { PressReleaseItem } from '@/components/section/HomeSection/PressRelease/PressReleaseItem';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ViewAllButton } from '@/components/ui/ViewAllUI';
import { getPressReleases } from '@/libs/api/press.releases.api';
import { homeSections } from '@/libs/consts/home.const';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const pressReleaseQueryKey = ['home-press-releases', 'approved', 1, 5];

export default function PressReleaseSectionClient() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: pressReleaseQueryKey,
    queryFn: () =>
      getPressReleases({
        status: 'approved',
        page: 1,
        limit: 5,
      }),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = data?.data ?? [];

  return (
    <HomeSection id={homeSections.pressRelease.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h3"
          title="Latest Press Releases"
          description="Official communications from Government of Sierra Leone"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        <div className="space-y-14">
          {isLoading ? (
            <p className="text-[19px] text-[#505A5F] italic">Loading press releases...</p>
          ) : isError ? (
            <p className="text-[19px] text-[#505A5F] italic">Press releases could not be loaded.</p>
          ) : items.length === 0 ? (
            <p className="text-[19px] text-[#505A5F] italic">
              No recent updates available at this time.
            </p>
          ) : (
            <div className="space-y-12 sm:space-y-14">
              {items.map((item) => (
                <PressReleaseItem
                  key={item.id}
                  item={item}
                  onNavigate={(path) => router.push(path)}
                />
              ))}
            </div>
          )}
        </div>

        <ViewAllButton onClick={() => router.push(homeSections.pressRelease.routes.all)}>
          See all Press Releases
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
