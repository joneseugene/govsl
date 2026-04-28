'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { HomeSection } from '@/components/ui/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Search2 } from '@/components/ui/SearchUI2'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Pagination } from '@/components/ui/PaginationUI'

import { mockPublications } from '@/libs/sampleData'
import { PublicationCard } from '@/components/section/AllSection/PublicationAll/PublicationCard'

export default function AllPublicationsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMinistry, setSelectedMinistry] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 3

  /* ---------------- Filter + Search ---------------- */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return mockPublications.filter((pub) => {
      const ministry = pub.ministry ?? ''
      const category = pub.category ?? ''

      const matchesSearch =
        pub.title.toLowerCase().includes(q) ||
        ministry.toLowerCase().includes(q)

      const matchesMinistry =
        selectedMinistry === 'all' || ministry === selectedMinistry

      const matchesCategory =
        selectedCategory === 'all' || category === selectedCategory

      return matchesSearch && matchesMinistry && matchesCategory
    })
  }, [searchQuery, selectedMinistry, selectedCategory])

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
        new Set(mockPublications.map((p) => p.ministry).filter((m): m is string => Boolean(m)))
      ),
    ],
    []
  )

  const categories = useMemo(
    () => [
      'all',
      ...Array.from(
        new Set(mockPublications.map((p) => p.category).filter((c): c is string => Boolean(c)))
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
          title="All Publications & Reports"
          description="Policy documents, white papers, and official government reports"
          showBack
          onBack={() => router.push('/')}
        />

        {/* Search + Filters */}
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

          <div className="flex-1 min-w-0">
            <FilterDropdown
              value={selectedCategory}
              onChange={(v) => {
                setSelectedCategory(v)
                setCurrentPage(1)
              }}
              options={categories.map((c) => ({
                value: c,
                label: c === 'all' ? 'All Categories' : c,
              }))}
            />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} publications
        </p>

        {/* Publication cards */}
        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching publications found.
            </div>
          ) : (
            paginated.map((pub) => (
              <PublicationCard
                key={pub.id}
                id={pub.id}
                ministry={pub.ministry}
                date={pub.date}
                title={pub.title}
                fileSize={pub.fileSize}
                summary={pub.summary}
                category={pub.category}
                onReadMore={(id) => router.push(`/publications/${id}`)}
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
