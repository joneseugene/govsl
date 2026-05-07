'use client';

import { useRouter } from 'next/navigation';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search2 } from '@/components/ui/SearchUI2';
import { Tabs } from '@/components/ui/TabUI';
import { Pagination } from '@/components/ui/PaginationUI';
import { AppointmentNoticeCard } from '@/components/section/AllSection/AppointmentAll/AppointmentAllCard';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/libs/hook/useDebounce';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

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
  category,
  ministryId,
  ministries,
}: {
  items: AppointmentInterface[];
  total: number;
  currentPage: number;
  search?: string;
  category?: string;
  ministryId?: string;
  ministries: { id: string; name: string }[];
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(total / itemsPerPage);

  // Ministry options
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

  // 🔹 Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedMinistry !== 'all') params.set('ministryId', selectedMinistry);

    router.push(`/appointment?${params.toString()}`);
  }, [debouncedSearch, selectedCategory, selectedMinistry, router]);

  // 🔹 Pagination
  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedMinistry !== 'all') params.set('ministryId', selectedMinistry);

    router.push(`/appointment?${params.toString()}`, { scroll: false });
  };

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
              label: 'Appointments',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h2"
          title="Appointment Notices"
          description="Official notices of government appointments"
          showBack
          onBack={() => router.push('/')}
        />

        {/* FILTERS */}
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

        <div className="flex-1">
          <Tabs
            label="Categories"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {/* COUNT */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} notices
        </p>

        {/* LIST */}
        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No appointment notices found.
            </div>
          ) : (
            items.map((notice) => (
              <AppointmentNoticeCard
                key={notice.id}
                id={notice.id}
                office={notice.office_name ?? ''}
                date={notice.appointment_date ?? ''}
                recipientName={notice.appointee_name ?? ''}
                title={notice.title ?? null}
                onReadMore={(id) => router.push(`/appointments/${id}`)}
              />
            ))
          )}
        </div>

        {/* PAGINATION */}
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
