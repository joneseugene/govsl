'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { PublicationItem } from './PublicationItem';
import { useRouter } from 'next/navigation';
import { getHomePublications, publicationQueryKey } from '@/libs/query/home/publication.query';
import { useQuery } from '@tanstack/react-query';

export default function PublicationSectionClient() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: publicationQueryKey,
    queryFn: getHomePublications,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = data?.data ?? [];

  return (
    <HomeSection id={homeSections.publication.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Official Publications & Reports"
          description="Policy documents, strategic plans, annual reports and government publications."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {isLoading ? (
          <div className="space-y-8 py-12 text-center">
            <p className="text-[19px] italic text-[#505A5F]">Loading publications...</p>
          </div>
        ) : isError ? (
          <div className="space-y-8 py-12 text-center">
            <p className="text-[19px] italic text-[#505A5F]">Publications could not be loaded.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="space-y-8 py-12 text-center">
            <p className="text-[19px] italic text-[#505A5F]">
              No recent publications available at this time.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-12 space-y-12 sm:space-y-14">
              {items.map((item) => (
                <PublicationItem
                  key={item.id}
                  item={item}
                  onNavigate={(path) => router.push(path)}
                />
              ))}
            </div>

            <ViewAllButton onClick={() => router.push(homeSections.publication.routes.all)}>
              See all Publications & Reports
            </ViewAllButton>
          </>
        )}
      </div>
    </HomeSection>
  );
}
