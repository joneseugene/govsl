// AnnouncementAll.client.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Pagination } from '@/components/ui/PaginationUI';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

import { useDebounce } from '@/libs/hook/useDebounce';
import { AnnouncementInterface } from '@/libs/interface/announcements.interface';

import { AnnouncementCard } from './AnnouncementCard';
import { Tabs } from '@/components/ui/TabUI';

interface AllAnnouncementClientProps {
  items: AnnouncementInterface[];
  total: number;
  currentPage: number;
  search?: string;
  ministryId?: string;
  category?: string;
  ministries: { id: string; name: string }[];
}

export default function AllAnnouncementClient({
  items,
  total,
  currentPage,
  search,
  ministryId,
  ministries,
  category,
}: AllAnnouncementClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');

  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(total / itemsPerPage);

  /* ---------------- URL Sync ---------------- */
  // URL Sync
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedMinistry !== 'all') {
      params.set('ministry', selectedMinistry);
    }

    // ADD THIS
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    router.push(`/announcement?${params.toString()}`);
  }, [debouncedSearch, selectedMinistry, selectedCategory, router]);

  /* ---------------- Pagination ---------------- */
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

  /* ---------------- Ministry Options ---------------- */
  const ministryOptions = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Ministries',
      },

      ...ministries.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ];
  }, [ministries]);

  /* ---------------- Category Options ---------------- */
  const CATEGORY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'vacancy', label: 'Vacancy' },
    { value: 'notice', label: 'Notice' },
    { value: 'event', label: 'Event' },
  ];

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
              label: 'Announcements',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        {/* Heading */}
        <SectionHeading
          level="h3"
          title="Official Announcements"
          description="Official government announcements and public notices"
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

        <div className="mb-8">
          <Tabs
            label="Categories"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {/* Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} announcements
        </p>

        {/* List */}
        <div className="space-y-5">
          {items.length === 0 ? (
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
