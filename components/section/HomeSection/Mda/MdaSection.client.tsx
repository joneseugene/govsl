'use client';

import { HomeSection } from '../../../ui/HomeSections';
import { SectionHeading } from '../../../ui/SectionHeading';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { MdaItem } from './MdaItem';
import { homeSections } from '@/libs/consts/home.const';
import { useRouter } from 'next/navigation';
import { getHomeMdas, mdaQueryKey } from '@/libs/query/home/mda.query';
import { useQuery } from '@tanstack/react-query';

export default function MDASectionClient() {
  const router = useRouter();

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: mdaQueryKey,
    queryFn: getHomeMdas,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return (
    <HomeSection id={homeSections.mda.id} className="bg-white px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {/* List of MDAs */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {isLoading ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              Loading ministries, departments and agencies...
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              Ministries, departments and agencies could not be loaded.
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-[18px] italic text-[#505A5F]">
              No ministries, departments or agencies available.
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {items.map((item) => (
                <MdaItem
                  key={item.id}
                  item={item}
                  onNavigate={(path) => router.push(path)}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>

        {/* View All */}
        <div className="mt-6 text-center">
          <ViewAllButton onClick={() => router.push(homeSections.mda.routes.all)}>
            See all Ministries, Departments & Agencies
          </ViewAllButton>
        </div>
      </div>
    </HomeSection>
  );
}
