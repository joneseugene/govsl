'use client';

import { SectionHeading } from '../../../ui/SectionHeading';
import { HomeSection } from '../../../ui/HomeSections';
import { homeSections } from '@/libs/consts/home.const';
import { ViewAllButton } from '../../../ui/ViewAllUI';
import { NewsItem } from './NewsItem';
import { useRouter } from 'next/navigation';
import { NewsArticleInterface } from '@/libs/interface/news.articles.interface';

type NewsResponse =
  | NewsArticleInterface[]
  | {
      data?: NewsArticleInterface[];
    };

type Props = {
  initialData: NewsResponse;
};

export default function NewsArticleSectionClient({ initialData }: Props) {
  const router = useRouter();

  const items: NewsArticleInterface[] = Array.isArray(initialData)
    ? initialData
    : Array.isArray(initialData?.data)
      ? initialData.data
      : [];

  return (
    <HomeSection id={homeSections.news.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h3"
          title="Government News & Updates"
          description="Official updates from ministries, departments, and agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
        />

        {items.length === 0 ? (
          <div className="py-16 text-center text-[19px] italic text-[#505A5F]">
            No recent government news available.
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {items.map((item, index) => (
              <NewsItem
                key={item.id ?? `${item.title}-${index}`}
                item={item}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        <ViewAllButton
          onClick={() =>
            router.push(
              `${homeSections.news.routes.all}?from=%2F%23${homeSections.news.id}`,
            )
          }
        >
          See all Government News & Updates
        </ViewAllButton>
      </div>
    </HomeSection>
  );
}