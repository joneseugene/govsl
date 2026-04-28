'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { NewsItem } from './NewsItem';
import { useRouter } from 'next/navigation';
import { NewsArticleInterface } from '@/libs/interface/news.articles.interface';

export default function NewsArticleSectionClient({ items }: { items: NewsArticleInterface[] }) {
  const router = useRouter();

  return (
    <HomeSection id={homeSections.news.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h2"
          title="Government News & Updates"
          description="Official updates from ministries, departments, and agencies"
        />

        {items.length === 0 ? (
          <div
            className="
            text-center py-16
            text-[19px] text-[#505A5F] italic
          "
          >
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
