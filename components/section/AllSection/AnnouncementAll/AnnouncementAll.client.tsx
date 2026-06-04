'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Tabs } from '@/components/ui/TabUI';
import { useDebounce } from '@/libs/hook/useDebounce';
import { AnnouncementCard } from './AnnouncementCard';
import {
  announcementAllQueryKey,
  announcementMdaOptionsQueryKey,
  getAllAnnouncements,
  getAnnouncementMdaOptions,
} from '@/libs/query/all/announcement_all.query';

interface AllAnnouncementClientProps {
  currentPage: number;
  search?: string;
  ministryId?: string;
  category?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'vacancy', label: 'Vacancy' },
  { value: 'notice', label: 'Notice' },
  { value: 'event', label: 'Event' },
];

export default function AllAnnouncementClient({
  currentPage,
  search,
  ministryId,
  category,
}: AllAnnouncementClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const queryParams = {
    page: currentPage,
    search: debouncedSearch.trim() || undefined,
    ministryId: selectedMinistry !== 'all' ? selectedMinistry : undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
  };

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: announcementAllQueryKey(queryParams),
    queryFn: () => getAllAnnouncements(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { data: ministries = [] } = useQuery({
    queryKey: announcementMdaOptionsQueryKey,
    queryFn: getAnnouncementMdaOptions,
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
      params.set('ministry', selectedMinistry);
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    router.push(`/announcement?${params.toString()}`);
  }, [debouncedSearch, selectedMinistry, selectedCategory, router]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', String(page));

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministry', selectedMinistry);
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    router.push(`/announcement?${params.toString()}`, {
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
          items={[{ label: 'Home', page: '/' }, { label: 'Announcements' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Official Announcements"
          description="Official government announcements and public notices"
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

        <div className="mb-8">
          <Tabs
            label="Categories"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={CATEGORY_OPTIONS}
          />
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} announcements
        </p>

        <div className="space-y-5">
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading announcements...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Announcements could not be loaded.
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching announcements found.
            </div>
          ) : (
            items.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                item={announcement}
                onNavigate={(path) => router.push(path)}
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
