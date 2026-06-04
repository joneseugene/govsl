'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { Pagination } from '@/components/ui/PaginationUI';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useDebounce } from '@/libs/hook/useDebounce';
import { MDAInterface } from '@/libs/interface/mda/mdas.interface';
import { MDACard } from './MdaCard';
import { mdaAllQueryKey, getAllMdas } from './MdaAll.query';

type Props = {
  currentPage: number;
  search?: string;
  type?: string;
  acronym?: string;
};

export default function AllMDAClient({ currentPage, search, type, acronym }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedType, setSelectedType] = useState(type ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const queryParams = {
    search: debouncedSearch.trim() || undefined,
  };

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: mdaAllQueryKey(queryParams),
    queryFn: () => getAllMdas(queryParams),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const a = acronym?.toLowerCase();

    return items.filter((mda: MDAInterface) => {
      const matchesSearch =
        mda.name.toLowerCase().includes(q) ||
        mda.acronym?.toLowerCase().includes(q) ||
        mda.type?.toLowerCase().includes(q);

      const matchesType = selectedType === 'all' || mda.type === selectedType;

      const matchesAcronym = !a || mda.acronym?.toLowerCase() === a;

      return matchesSearch && matchesType && matchesAcronym;
    });
  }, [items, searchQuery, selectedType, acronym]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Ministry', label: 'Ministry' },
    { value: 'Department', label: 'Department' },
    { value: 'Agency', label: 'Agency' },
  ];

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType);
    }

    if (acronym) {
      params.set('acronym', acronym);
    }

    router.replace(`/mda?${params.toString()}`);
  }, [debouncedSearch, selectedType, acronym, router]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType);
    }

    if (acronym) {
      params.set('acronym', acronym);
    }

    router.push(`/mda?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleView = (mda: MDAInterface) => {
    router.push(`/mda/${mda.id}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: 'Home', page: '/' }, { label: 'MDAs' }]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Ministries, Departments & Agencies"
          description="Browse government MDAs of Sierra Leone"
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
            <FilterDropdown value={selectedType} onChange={setSelectedType} options={typeOptions} />
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} MDAs
        </p>

        <div className="space-y-5">
          {isLoading ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              Loading MDAs...
            </div>
          ) : isError ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              MDAs could not be loaded.
            </div>
          ) : paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching MDAs found.
            </div>
          ) : (
            paginated.map((mda: MDAInterface) => (
              <div key={mda.id} className="h-full">
                <MDACard name={mda.name} onViewClick={() => handleView(mda)} />
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
