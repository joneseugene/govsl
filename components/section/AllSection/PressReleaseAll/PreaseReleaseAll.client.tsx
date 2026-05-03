'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HomeSection } from '@/components/ui/HomeSections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { Search2 } from '@/components/ui/SearchUI2';
import { PressReleaseAllCard } from '@/components/section/AllSection/PressReleaseAll/PressReleaseAllCard';
import { Pagination } from '@/components/ui/PaginationUI';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';

export default function PressReleasesAllClient({
  items,
  total,
  currentPage,
}: {
  items: PressReleaseInterface[];
  total: number;
  currentPage: number;
}) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('all');

  const itemsPerPage = 2;

  // =========================
  // SORT ONLY CURRENT PAGE DATA
  // =========================
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [items]);

  // =========================
  // FILTER ONLY CURRENT PAGE DATA
  // =========================
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return sorted.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(q) ||
        item.mdas?.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q);

      const matchesMinistry = selectedMinistry === 'all' || item.mdas?.name === selectedMinistry;

      return matchesSearch && matchesMinistry;
    });
  }, [sorted, searchQuery, selectedMinistry]);

  // =========================
  // MINISTRIES (from current page only)
  // =========================
  const ministries = useMemo(() => {
    return [
      'all',
      ...Array.from(new Set(items.map((p) => p.mdas?.name).filter(Boolean) as string[])),
    ];
  }, [items]);

  // =========================
  // SERVER-DRIVEN PAGINATION
  // =========================
  const totalPages = Math.ceil((total ?? 0) / itemsPerPage);

  const updatePage = (page: number) => {
    router.push(`/press-release?page=${page}`);
  };

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h2"
          title="Press Releases & Official Announcements"
          description="Official communications from the Government of Sierra Leone"
          showBack
          onBack={() => router.push('/')}
        />

        {/* FILTERS */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Search2
              onSearch={(q) => {
                setSearchQuery(q);
                updatePage(1);
              }}
            />
          </div>

          <div className="flex-1">
            <FilterDropdown
              value={selectedMinistry}
              onChange={(v) => {
                setSelectedMinistry(v);
                updatePage(1);
              }}
              options={ministries.map((m) => ({
                value: m,
                label: m === 'all' ? 'All Ministries' : m,
              }))}
            />
          </div>
        </div>

        {/* RESULTS */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {items.length} of {total} items
        </p>

        {/* LIST */}
        <div className="space-y-5">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching press releases found.
            </div>
          ) : (
            filtered.map((release) => <PressReleaseAllCard key={release.id} release={release} />)
          )}
        </div>

        {/* PAGINATION (SERVER CONTROLLED ONLY) */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={updatePage} />
        )}
      </div>
    </HomeSection>
  );
}
