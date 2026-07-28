'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { NewsCard } from '@/components/section/AllSection/GovernmentNewsAll/NewsCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useDebounce } from '@/libs/hook/useDebounce';
import { NewsArticleInterface } from '@/libs/interface/news.articles.interface';

type MinistryOption = {
  id: string;
  name: string;
};

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
  newsItems: NewsArticleInterface[];
  total: number;
  ministries: MinistryOption[];
};

export default function AllGovernmentNewsClient({
  currentPage,
  search,
  ministryId,
  newsItems,
  total,
  ministries,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);
  const from = searchParams.get('from');

  const items = newsItems;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace('/');
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (from) {
      params.set('from', from);
    }

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    const nextUrl = `/news?${params.toString()}`;
    const currentUrl = `/news?${searchParams.toString()}`;

    if (nextUrl === currentUrl) return;

    router.replace(nextUrl, {
      scroll: false,
    });
  }, [debouncedSearch, selectedMinistry, router, from, searchParams]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (from) {
      params.set('from', from);
    }

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.replace(`/news?${params.toString()}`, {
      scroll: false,
    });
  };

  const ministryOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Ministries' },
      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'News and Articles' }]}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="Government News"
          description="Latest official news and updates from ministries and agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={handleBack}
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Search2 value={searchQuery} onSearch={setSearchQuery} />
          </div>

          <div className="flex-1">
            <FilterDropdown
              value={selectedMinistry}
              onChange={setSelectedMinistry}
              options={ministryOptions}
            />
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} news items
        </p>

        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching news items found.
            </div>
          ) : (
            items.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                ministry={item.mdas?.name}
                date={item.date}
                title={item.title}
                summary={item.summary ?? ''}
                onReadMore={(id) => router.push(`/news/${id}`)}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={updatePage}
            />
          </div>
        )}
      </div>
    </HomeSection>
  );
}
