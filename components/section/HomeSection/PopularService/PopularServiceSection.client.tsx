'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PopularCategoryItem } from './PopularServiceItem';
import { useRouter } from 'next/navigation';
import { getHomePopularServices, popularServicesQueryKey } from '@/libs/query/home/service.query';
import { useQuery } from '@tanstack/react-query';

export default function PopularServicesSectionClient() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: popularServicesQueryKey,
    queryFn: getHomePopularServices,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = data?.data ?? [];

  return (
    <HomeSection id={homeSections.service.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Popular Services"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-[19px] italic text-[#505A5F]">Loading popular services...</p>
          </div>
        ) : isError ? (
          <div className="py-20 text-center">
            <p className="text-[19px] italic text-[#505A5F]">
              Popular services could not be loaded.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[19px] italic text-[#505A5F]">
              No popular services available at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-14">
            {items.map((item) => (
              <PopularCategoryItem
                key={item.id}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <ViewAllButton onClick={() => router.push(homeSections.service.routes.all)}>
          See all Popular Services
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
