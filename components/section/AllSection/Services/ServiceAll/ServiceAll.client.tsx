'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { Pagination } from '@/components/ui/PaginationUI';

import { useDebounce } from '@/libs/hook/useDebounce';
import { ServiceCard } from './ServiceCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

type ServiceCategory = {
  category: string;
  category_page?: string;
  count: number;
};

export default function AllServicesClient({
  items,
  currentPage,
  search,
  category,
}: {
  items: ServiceCategory[];
  currentPage: number;
  search?: string;
  category?: string;
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(search ?? '');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'all');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  /* ---------------- Filtered (client-side for now) ---------------- */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return items.filter((item) => {
      const matchesSearch = item.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* ---------------- Categories ---------------- */
  const categoryOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Categories' },
      ...items.map((c) => ({
        value: c.category,
        label: c.category,
      })),
    ];
  }, [items]);

  /* ---------------- Sync URL ---------------- */
  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', '1');

    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    router.replace(`/service?${params.toString()}`);
  }, [debouncedSearch, selectedCategory, router]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', page.toString());

    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    router.push(`/service?${params.toString()}`, { scroll: false });
  };

  /* ---------------- Navigate ---------------- */
  const handleView = (item: ServiceCategory) => {
    const page = item.category_page || 'services';
    router.push(`/service/${page}`);
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
              label: 'Categories',
            },
          ]}
          onNavigate={(page) => router.push(page)}
          variant="government"
        />

        <SectionHeading
          level="h3"
          title="Government Services"
          description="Browse government services by category"
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
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
          </div>
        </div>

        {/* Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} categories
        </p>

        {/* Row*/}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          {paginated.length === 0 ? (
            <div className="text-left text-gray-500">
              No services found.
            </div>
          ) : (
            paginated.map((item) => (
              <div key={item.category} className="h-full">
                <ServiceCard
                  name={item.category}
                  description={`${item.count} service${item.count !== 1 ? 's' : ''} available`}
                  category={item.category}
                  onClick={() => handleView(item)}
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
