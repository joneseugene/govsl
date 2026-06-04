'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { NewsItem } from './NewsItem';
import { useRouter } from 'next/navigation';
import { getHomeNewsArticles, newsQueryKey } from '@/libs/query/home/news.query';
import { useQuery } from '@tanstack/react-query';

export default function NewsArticleSectionClient() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: newsQueryKey,
    queryFn: getHomeNewsArticles,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = data?.data ?? [];

  return (
    <HomeSection id={homeSections.news.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h3"
          title="Government News & Updates"
          description="Official updates from ministries, departments, and agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {isLoading ? (
          <div className="py-16 text-center text-[19px] italic text-[#505A5F]">
            Loading government news...
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-[19px] italic text-[#505A5F]">
            Government news could not be loaded.
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-[19px] italic text-[#505A5F]">
            No recent government news available.
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {items.map((item) => (
              <NewsItem key={item.id} item={item} onNavigate={(path) => router.push(path)} />
            ))}
          </div>
        )}

        {/* View All */}
        <ViewAllButton onClick={() => router.push(homeSections.news.routes.all)}>
          See all Government News & Updates
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}
