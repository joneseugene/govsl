'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pagination } from '@/components/ui/PaginationUI';
import { AppointmentNoticeCard } from '@/components/section/AllSection/AppointmentAll/AppointmentAllCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Search2 } from '@/components/ui/SearchUI2';
import { Tabs } from '@/components/ui/TabUI';
import { useDebounce } from '@/libs/hook/useDebounce';
import {
  appointmentAllQueryKey,
  appointmentMdaOptionsQueryKey,
  getAllAppointments,
  getAppointmentMdaOptions,
} from '@/libs/query/all/appointment_all.query';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'executive', label: 'Executive' },
  { value: 'ministerial', label: 'Ministerial' },
  { value: 'board', label: 'Board' },
  { value: 'diplomatic', label: 'Diplomatic' },
];

type AppointmentAllClientProps = {
  currentPage: number;
  search?: string;
  ministryId?: string;
  category?: string;
};

export default function AppointmentAllClient({
  currentPage,
  search,
  ministryId,
  category,
}: AppointmentAllClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');
  const [selectedMinistry, setSelectedMinistry] = useState(ministryId ?? 'all');

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
    queryKey: appointmentAllQueryKey(queryParams),
    queryFn: () => getAllAppointments(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  useQuery({
    queryKey: appointmentMdaOptionsQueryKey,
    queryFn: getAppointmentMdaOptions,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const items = result?.data ?? [];
  const total = result?.total ?? 0;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.push(`/appointment?${params.toString()}`);
  }, [debouncedSearch, selectedCategory, selectedMinistry, router]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
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
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Appointments' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Appointment Notices"
          description="Official government appointments, designations and public service notices."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={() => router.back()}
        />

        <div className="mb-5 flex flex-col gap-4">
          <div className="w-full max-w-md">
            <Search2 value={searchQuery} onSearch={setSearchQuery} />
          </div>

          <div>
            <Tabs
              label="Categories"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={CATEGORY_OPTIONS}
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            Showing <span className="font-semibold text-[#003366]">{items.length}</span> of{' '}
            <span className="font-semibold text-[#003366]">{total}</span> notices
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Loading appointment notices...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            Appointment notices could not be loaded.
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-[18px] italic text-[#505A5F] shadow-sm">
            No appointment notices available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {items.map((notice, index) => (
              <AppointmentNoticeCard
                key={`${notice.id ?? 'appointment'}-${notice.reference_number ?? index}`}
                item={notice}
                onNavigate={(path) => router.push(path)}
              />
            ))}
          </div>
        )}

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
