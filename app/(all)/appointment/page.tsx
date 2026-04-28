'use client'

import { AppointmentNoticeCard } from '@/components/section/AllSection/AppointmentAll/AppointmentAllCard'
import { HomeSection } from '@/components/ui/HomeSections'
import { Pagination } from '@/components/ui/PaginationUI'
import { Search2 } from '@/components/ui/SearchUI2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tabs } from '@/components/ui/TabUI'
import { AppointmentInterface } from '@/libs/interface/appointments.interface'
import { mockAppointments } from '@/libs/sampleData'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'executive', label: 'Executive' },
  { value: 'ministerial', label: 'Ministerial' },
  { value: 'board', label: 'Board' },
  { value: 'diplomatic', label: 'Diplomatic' },
]

export default function AllAppointmentNoticesPage() {
  const router = useRouter()

  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 2
  const appointmentNotices: AppointmentInterface[] = mockAppointments

  // Filtered data
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return appointmentNotices.filter((item) => {
      const matchesSearch =
        item.recipient_name?.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.office_name?.toLowerCase().includes(q) ||
        false

      const matchesCategory =
        selectedCategory === 'all' ||
        item.category?.toLowerCase() === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [appointmentNotices, searchQuery, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage])

  // Handlers
  const handleNavigate = (id: string) => {
    router.push(`/appointment-${id}`)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 space-y-3">
          <SectionHeading
            level="h2"
            title="Appointment Notices"
            description="Official notices of government appointments and designations issued by the Government of Sierra Leone"
            showBack
            onBack={() => router.push('/')}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-5 lg:gap-6">
          <div className="flex-1 min-w-0">
            <Search2 onSearch={handleSearch} />
          </div>

          <div className="flex-1 min-w-0">
            <Tabs
              label="Categories"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={CATEGORY_OPTIONS}
            />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} notices
        </p>

        {/* Appointment Cards */}
        <div className="space-y-5">
          {paginated.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              {searchQuery || selectedCategory !== 'all'
                ? 'No matching appointment notices found.'
                : 'No appointment notices available at this time.'}
            </div>
          ) : (
            paginated.map((notice) => (
              <AppointmentNoticeCard
                key={notice.id}
                id={notice.id}
                category={notice.category ?? null}
                office={notice.office_name ?? ""}
                date={notice.date ?? ""}
                recipientName={notice.recipient_name ?? ""}
                title={notice.title ?? null}
                onReadMore={handleNavigate}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </HomeSection>
  )
}
