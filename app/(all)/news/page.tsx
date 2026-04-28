'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { HomeSection } from '@/components/ui/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Search2 } from '@/components/ui/SearchUI2'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Pagination } from '@/components/ui/PaginationUI'

import { mockNewsItems } from '@/libs/sampleData'
import { NewsCard } from '@/components/section/AllSection/NewsAll/NewsCard'

export default function AllGovernmentNews() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMinistry, setSelectedMinistry] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 3

  /* ---------------- Filter + Search ---------------- */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return mockNewsItems.filter((item) => {
      const ministry = item.ministry ?? ''

      const matchesSearch =
        item.headline.toLowerCase().includes(q) ||
        ministry.toLowerCase().includes(q)

      const matchesMinistry =
        selectedMinistry === 'all' || ministry === selectedMinistry

      return matchesSearch && matchesMinistry
    })
  }, [searchQuery, selectedMinistry])


  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  /* ---------------- Filter Options ---------------- */
  const ministries = useMemo(
    () => [
      'all',
      ...Array.from(
        new Set(
          mockNewsItems
            .map((n) => n.ministry)
            .filter((m): m is string => Boolean(m))
        )
      ),
    ],
    []
  )


  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <SectionHeading
          level="h2"
          title="Government News"
          description="Latest official news and updates from ministries and agencies"
          showBack
          onBack={() => router.push('/')}
        />

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-5 lg:gap-6">
          <div className="flex-1 min-w-0">
            <Search2
              onSearch={(q) => {
                setSearchQuery(q)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <FilterDropdown
              value={selectedMinistry}
              onChange={(v) => {
                setSelectedMinistry(v)
                setCurrentPage(1)
              }}
              options={ministries.map((m) => ({
                value: m,
                label: m === 'all' ? 'All Ministries' : m,
              }))}
            />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} news items
        </p>

        {/* News cards */}
        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching news items found.
            </div>
          ) : (
            paginated.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                ministry={item.ministry}
                date={item.date}
                headline={item.headline}
                excerpt={item.excerpt}
                onReadMore={(id) => router.push(`/news/${id}`)}
              />
            ))
          )}
        </div>


        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </HomeSection>
  )
}
