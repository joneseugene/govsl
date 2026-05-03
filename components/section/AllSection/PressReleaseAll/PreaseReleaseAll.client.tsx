'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { PressReleaseAllCard } from '@/components/section/AllSection/PressReleaseAll/PressReleaseAllCard';
import { Pagination } from '@/components/ui/PaginationUI';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/libs/hook/useDebounce';

export default function PressReleasesAllClient({
  items,
  total,
  currentPage,
  search,
  ministryId,
  ministries,
}: {
  items: PressReleaseInterface[];
  total: number;
  currentPage: number;
  search?: string;
  ministryId?: string;
  ministries: { id: string; name: string }[];
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(total / itemsPerPage);

  const ministryOptions = useMemo(() => {
    if (!ministries) return [{ value: 'all', label: 'All Ministries' }];

    return [
      { value: 'all', label: 'All Ministries' },
      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

  //Debounce on Search
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    if (selectedMinistry && selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/press-release?${params.toString()}`);
  }, [debouncedSearch, selectedMinistry]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (selectedMinistry && selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    if (router) {
      router.push(`/press-release?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h2"
          title="Press Releases & Official Announcements"
          description="Official communications from the Government of Sierra Leone"
          showBack
          onBack={() => router.push('/')}
        />

        {/* FILTERS */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Search2 value={searchQuery} onSearch={(q) => setSearchQuery(q)} />
          </div>

          <div className="flex-1">
            <FilterDropdown
              value={selectedMinistry}
              onChange={(v) => {
                setSelectedMinistry(v);
              }}
              options={ministryOptions}
            />
          </div>
        </div>

        {/* RESULTS */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} results
        </p>

        {/* LIST */}
        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No press releases found.
            </div>
          ) : (
            items.map((release) => <PressReleaseAllCard key={release.id} release={release} />)
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={updatePage} />
        )}
      </div>
    </HomeSection>
  );
}
