// AppointmentAll.client.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pagination } from '@/components/ui/PaginationUI';
import { AppointmentNoticeCard } from '@/components/section/AllSection/AppointmentAll/AppointmentAllCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Search2 } from '@/components/ui/SearchUI2';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Tabs } from '@/components/ui/TabUI';

import { AppointmentSummaryInterface } from '@/libs/interface/appointments.interface';
import { useDebounce } from '@/libs/hook/useDebounce';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'executive', label: 'Executive' },
  { value: 'ministerial', label: 'Ministerial' },
  { value: 'board', label: 'Board' },
  { value: 'diplomatic', label: 'Diplomatic' },
];

export default function AppointmentAllClient({
  items,
  total,
  currentPage,
  search,
  ministryId,
  category,
  ministries,
}: {
  items: AppointmentSummaryInterface[];
  total: number;
  currentPage: number;

  search?: string;
  ministryId?: string;
  category?: string;

  ministries: {
    id: string;
    name: string;
  }[];
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');

  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');

  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  // Ministry options
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

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/appointment?${params.toString()}`);
  }, [debouncedSearch, selectedCategory, selectedMinistry, router]);

  // Pagination
  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/appointment?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <HomeSection className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Home',
              page: '/',
            },
            {
              label: 'Appointments',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        {/* Heading */}
        <SectionHeading
          level="h2"
          title="Appointment Notices"
          description="Official government appointments, designations and public service notices."
          showBack
          onBack={() => router.back()}
        />

        {/* FILTERS */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row">
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

        {/* Categories */}
        <div className="mb-8">
          <Tabs
            label="Categories"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {/* COUNT */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            Showing <span className="font-semibold text-[#003366]">{items.length}</span> of{' '}
            <span className="font-semibold text-[#003366]">{total}</span> notices
          </p>
        </div>

        {/* LIST */}
        {items.length === 0 ? (
          <div
            className="
              rounded-2xl border border-slate-200
              bg-white py-16 text-center
              text-[18px] italic text-[#505A5F]
              shadow-sm
            "
          >
            No appointment notices available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {items.map((notice) => (
              <AppointmentNoticeCard
                key={notice.appointment_date}
                item={notice}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-10">
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
