'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { Pagination } from '@/components/ui/PaginationUI';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useDebounce } from '@/libs/hook/useDebounce';
import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { MDACard } from './MdaCard';

type Props = {
  currentPage: number;
  search?: string;
  type?: string;
  acronym?: string;
  mdas: MDAInterface[];
  total: number;
};

export default function AllMDAClient({
  currentPage,
  search,
  type,
  acronym,
  mdas,
  total,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedType, setSelectedType] = useState(type ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const from = searchParams.get('from');

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleBack = () => {
    if (from) {
      window.location.href = from;
      return;
    }

    router.replace('/');
  };

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Ministry', label: 'Ministry' },
    { value: 'Department', label: 'Department' },
    { value: 'Agency', label: 'Agency' },
  ];

  /**
   * Reset to page 1 whenever filters change
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    } else {
      params.delete('search');
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType);
    } else {
      params.delete('type');
    }

    if (acronym) {
      params.set('acronym', acronym);
    } else {
      params.delete('acronym');
    }

    if (from) {
      params.set('from', from);
    }

    router.replace(`/mdas?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedSearch, selectedType, acronym]);

  /**
   * Pagination
   */
  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());

    router.replace(`/mdas?${params.toString()}`, {
      scroll: false,
    });
  };

  /**
   * View detail
   */
  const handleView = (mda: MDAInterface) => {
    router.push(`/mdas/${mda.id}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: 'Home', page: '/' },
            { label: 'MDAs' },
          ]}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          description="Browse government MDAs of Sierra Leone"
          descriptionClassName="text-gray-400"
          descriptionSizeClassName="text-[16px]"
          showBack
          onBack={handleBack}
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Search2
              value={searchQuery}
              onSearch={setSearchQuery}
            />
          </div>

          <div className="flex-1">
            <FilterDropdown
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {mdas.length} of {total} MDAs
        </p>

        <div className="space-y-5">
          {mdas.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching MDAs found.
            </div>
          ) : (
            mdas.map((mda) => (
              <div key={mda.id} className="h-full">
                <MDACard
                  name={mda.name}
                  onViewClick={() => handleView(mda)}
                />
              </div>
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