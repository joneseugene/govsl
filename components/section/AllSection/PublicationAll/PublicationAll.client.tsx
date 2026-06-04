'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { PublicationCard } from '@/components/section/AllSection/PublicationAll/PublicationCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useDebounce } from '@/libs/hook/useDebounce';
import {
  getAllPublications,
  getPublicationMdaOptions,
  publicationAllQueryKey,
  publicationMdaOptionsQueryKey,
} from '@/libs/query/all/publication_all.query';

type Props = {
  currentPage: number;
  search?: string;
  ministryId?: string;
};

export default function PublicationAllClient({ currentPage, search, ministryId }: Props) {
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
    queryKey: publicationAllQueryKey(queryParams),
    queryFn: () => getAllPublications(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { data: ministries = [] } = useQuery({
    queryKey: publicationMdaOptionsQueryKey,
    queryFn: getPublicationMdaOptions,
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

    router.push(`/publication?${params.toString()}`);
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

    router.push(`/publication?${params.toString()}`, {
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
          items={[{ label: 'Home', page: '/' }, { label: 'Publications and Reports' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="All Publications & Reports"
          description="Policy documents, white papers, and official government reports"
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
          Showing {items.length} of {total} publications
        </p>

        <div className="space-y-10">
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading publications...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Publications could not be loaded.
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching publications found.
            </div>
          ) : (
            items.map((pub) => (
              <PublicationCard
                key={pub.id}
                id={pub.id}
                ministry={pub.mdas?.name ?? ''}
                date={pub.date}
                title={pub.title}
                description={pub.description}
                onReadMore={(id) => router.push(`/publication/${id}`)}
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
