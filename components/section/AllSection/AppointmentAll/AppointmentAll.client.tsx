'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pagination } from '@/components/ui/PaginationUI';
import { AppointmentNoticeCard } from '@/components/section/AllSection/AppointmentAll/AppointmentAllCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Search2 } from '@/components/ui/SearchUI2';
import { Tabs } from '@/components/ui/TabUI';
import { useDebounce } from '@/libs/hook/useDebounce';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'executive', label: 'Executive' },
  { value: 'ministerial', label: 'Ministerial' },
  { value: 'board', label: 'Board' },
  { value: 'diplomatic', label: 'Diplomatic' },
];

type MinistryOption = {
  id: string;
  name: string;
};

type AppointmentAllClientProps = {
  currentPage: number;
  search?: string;
  ministryId?: string;
  category?: string;
  appointments: AppointmentInterface[];
  total: number;
  ministries: MinistryOption[];
};

export default function AppointmentAllClient({
  currentPage,
  search,
  ministryId,
  category,
  appointments,
  total,
}: AppointmentAllClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');
  const [selectedMinistry] = useState(ministryId ?? 'all');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const from = searchParams.get('from');
  const items = appointments;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace('/');
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (from) {
      params.set('from', from);
    }

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.replace(`/appointments?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedCategory, selectedMinistry, router, from]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (from) {
      params.set('from', from);
    }

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedMinistry !== 'all') {
      params.set('ministryId', selectedMinistry);
    }

    router.replace(`/appointments?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <HomeSection className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'Appointments' }]}
          variant="government"
        />

        <SectionHeading
          level="h5"
          title="Appointment Notices"
          description="Official government appointments, designations and public service notices."
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={handleBack}
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

        {items.length === 0 ? (
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
