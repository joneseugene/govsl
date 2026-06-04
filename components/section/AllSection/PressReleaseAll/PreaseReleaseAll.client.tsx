'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { PressReleaseAllCard } from '@/components/section/AllSection/PressReleaseAll/PressReleaseAllCard';
import { Pagination } from '@/components/ui/PaginationUI';
import { useDebounce } from '@/libs/hook/useDebounce';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import {
  getAllPressReleases,
  getPressReleaseMdaOptions,
  pressReleaseAllQueryKey,
  pressReleaseMdaOptionsQueryKey,
} from '@/libs/query/all/press_release_all.query';

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
};

export default function PressReleasesAllClient({ currentPage, search, ministryId }: Props) {
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
    queryKey: pressReleaseAllQueryKey(queryParams),
    queryFn: () => getAllPressReleases(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { data: ministries = [] } = useQuery({
    queryKey: pressReleaseMdaOptionsQueryKey,
    queryFn: getPressReleaseMdaOptions,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const releases = result?.data ?? [];
  const total = result?.total ?? 0;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(total / itemsPerPage);

  const ministryOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Ministries' },
      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/press-release?${params.toString()}`);
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

    router.push(`/press-release?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Press Releases' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Press Releases"
          description="Official communications from the Government of Sierra Leone"
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
          Showing {releases.length} of {total} results
        </p>

        <div className="space-y-5">
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading press releases...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Press releases could not be loaded.
            </div>
          ) : releases.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No press releases found.
            </div>
          ) : (
            releases.map((release) => <PressReleaseAllCard key={release.id} release={release} />)
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
