'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { HomeSection } from '@/components/ui/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Search2 } from '@/components/ui/SearchUI2'
import { PressReleaseAllCard } from '@/components/section/AllSection/PressReleaseAll/PressReleaseAllCard'
import { Pagination } from '@/components/ui/PaginationUI'
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface'

export default function PressReleasesAllClient({
  initialData,
}: {
  initialData: PressReleaseInterface[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMinistry, setSelectedMinistry] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const router = useRouter()

  // Sort once
  const pressReleases = useMemo(() => {
    return [...initialData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [initialData])

  // Filter
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return pressReleases.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(q) ||
        item.mdas?.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q)

      const matchesMinistry =
        selectedMinistry === 'all' ||
        item.mdas?.name === selectedMinistry

      return matchesSearch && matchesMinistry
    })
  }, [pressReleases, searchQuery, selectedMinistry])

  // Pagination (CLIENT ONLY)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage])

  const ministries = useMemo(() => {
    return [
      'all',
      ...Array.from(
        new Set(pressReleases.map((p) => p.mdas?.name).filter(Boolean))
      ),
    ]
  }, [pressReleases])

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

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">

          <div className="flex-1">
            <Search2
              onSearch={(q) => {
                setSearchQuery(q)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="flex-1">
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

        {/* Results */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} items
        </p>

        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching press releases found.
            </div>
          ) : (
            paginated.map((release) => (
              <PressReleaseAllCard
                key={release.id}
                release={release}
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