'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { Pagination } from '@/components/ui/PaginationUI';
import { useDebounce } from '@/libs/hook/useDebounce';
import { MDACard } from './MdaCard';
import { MDAInterface } from '@/libs/interface/mda/mdas.interface';

export default function AllMDAClient({
  items,
  currentPage,
  search,
  type,
  acronym,
}: {
  items: MDAInterface[];
  currentPage: number;
  search?: string;
  type?: string;
  acronym?: string;
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedType, setSelectedType] = useState(type ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const itemsPerPage = 6;

  /* ---------------- Filter ---------------- */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return items.filter((mda) => {
      const matchesSearch =
        mda.name.toLowerCase().includes(q) ||
        mda.acronym?.toLowerCase().includes(q) ||
        mda.acronym?.toLowerCase().includes(q) ||
        mda.type?.toLowerCase().includes(q);

      const matchesType = selectedType === 'all' || mda.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, selectedType]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* ---------------- Type Options ---------------- */
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Ministry', label: 'Ministry' },
    { value: 'Department', label: 'Department' },
    { value: 'Agency', label: 'Agency' },
  ];

  /* ---------------- Sync URL ---------------- */
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType);
    }

    router.replace(`/mda?${params.toString()}`);
  }, [debouncedSearch, selectedType]);

  /* ---------------- Change Page ---------------- */
  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType);
    }

    router.push(`/mda?${params.toString()}`, {
      scroll: false,
    });
  };

  /* ---------------- Navigate ---------------- */
  const handleView = (mda: MDAInterface) => {
    router.push(`${mda.id}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <SectionHeading
          level="h2"
          title="Ministries, Departments & Agencies"
          description="Browse government MDAs of Sierra Leone"
          showBack
          onBack={() => router.push('/')}
        />

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Search2 value={searchQuery} onSearch={setSearchQuery} />
          </div>

          <div className="flex-1">
            <FilterDropdown value={selectedType} onChange={setSelectedType} options={typeOptions} />
          </div>
        </div>

        {/* Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} MDAs
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching MDAs found.
            </div>
          ) : (
            paginated.map((mda) => (
              <div key={mda.id} className="h-full">
                <MDACard
                  name={mda.name}
                  acronym={mda.acronym ?? ''}
                  type={mda.type ?? ''}
                  onViewClick={() => handleView(mda)}
                />
              </div>
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
