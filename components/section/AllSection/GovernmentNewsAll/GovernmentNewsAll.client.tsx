'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { NewsCard } from '@/components/section/AllSection/GovernmentNewsAll/NewsCard';

import { useDebounce } from '@/libs/hook/useDebounce';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsArticleInterface } from '@/libs/interface/news.articles.interface';

type Props = {
  items: NewsArticleInterface[];
  total: number;
  currentPage: number;
  search?: string;
  ministryId?: string;
  ministries: { id: string; name: string }[];
};

export default function AllGovernmentNewsClient({
  items,
  total,
  currentPage,
  search,
  ministryId,
  ministries,
}: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  /* ---------------- Sync URL ---------------- */
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
  }, [debouncedSearch, selectedMinistry]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/news?${params.toString()}`, { scroll: false });
  };

  /* ---------------- Dropdown Options ---------------- */
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
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Home',
              page: '/',
            },
            {
              label: 'News and Articles',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />
        <SectionHeading
          level="h3"
          title="Government News"
          description="Latest official news and updates from ministries and agencies"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[20px]"
          showBack
          onBack={() => router.back()}
        />

        {/* Filters */}
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

        {/* Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} news items
        </p>

        {/* List */}
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

        {/* Pagination */}
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
