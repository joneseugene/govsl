// MinistriesPage.tsx
'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { HomeSection } from '@/components/ui/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Search2 } from '@/components/ui/SearchUI2'
import { Pagination } from '@/components/ui/PaginationUI'
import { sampleMDAs } from '@/libs/sampleData'
import { MDACard } from '@/components/section/AllSection/MdaAll/MdaCard'

export default function MDAPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'Ministry' | 'Department' | 'Agency'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const safeMDAs = useMemo(() => sampleMDAs, [])

  // Filter MDAs
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return safeMDAs.filter((mda) => {
      const matchesSearch =
        mda.name.toLowerCase().includes(q) ||
        mda.acronym.toLowerCase().includes(q) ||
        mda.description.toLowerCase().includes(q)
      const matchesType = selectedType === 'all' || mda.type === selectedType
      return matchesSearch && matchesType
    })
  }, [safeMDAs, searchQuery, selectedType])

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const types = ['all', 'Ministry', 'Department', 'Agency'] as const

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
              value={selectedType}
              onChange={(v) => {
                setSelectedType(v as typeof selectedType)
                setCurrentPage(1)
              }}
              options={types.map((t) => ({
                value: t,
                label: t === 'all' ? 'All Types' : t,
              }))}
            />
          </div>
        </div>

        {/* Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} MDAs
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.length === 0 ? (
            <div className="col-span-full rounded-xl bg-white p-10 text-center text-gray-500">
              No matching MDAs found.
            </div>
          ) : (
            paginated.map((mda) => (
              <MDACard
                key={mda.id}
                name={mda.name}
                acronym={mda.acronym}
                type={mda.type}
                description={mda.description}
                onViewClick={() => router.push(`/mda-${mda.id}`)}
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
