'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { NewsCard } from '@/components/section/AllSection/GovernmentNewsAll/NewsCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useDebounce } from '@/libs/hook/useDebounce';
import {
  getAllGovernmentNews,
  getGovernmentNewsMdaOptions,
  governmentNewsAllQueryKey,
  governmentNewsMdaOptionsQueryKey,
} from '@/libs/query/all/news_all.query';

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
};

export default function AllGovernmentNewsClient({ currentPage, search, ministryId }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const queryParams = {
    page: currentPage,
    search: debouncedSearch.trim() || undefined,
    ministryId: selectedMinistry !== 'all' ? selectedMinistry : undefined,
  };

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: governmentNewsAllQueryKey(queryParams),
    queryFn: () => getAllGovernmentNews(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { data: ministries = [] } = useQuery({
    queryKey: governmentNewsMdaOptionsQueryKey,
    queryFn: getGovernmentNewsMdaOptions,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = result?.data ?? [];
  const total = result?.total ?? 0;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/news?${params.toString()}`);
  }, [debouncedSearch, selectedMinistry, router]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/news?${params.toString()}`, {
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
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Government News"
          description="Latest official news and updates from ministries and agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
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
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading news items...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Government news could not be loaded.
            </div>
          ) : items.length === 0 ? (
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
