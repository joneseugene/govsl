'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { HomeSection } from '@/components/ui/HomeSections'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Search2 } from '@/components/ui/SearchUI2'
import { Pagination } from '@/components/ui/PaginationUI'

import { servicesData, serviceCategoryPageMap } from '@/libs/sampleData'

// ---------------- Service Card ----------------
interface ServiceCardProps {
  name: string
  description?: string
  category?: string
  serviceCount?: number
  onViewClick: () => void
}

function ServiceCard({ name, description, category, serviceCount, onViewClick }: ServiceCardProps) {
  return (
    <div className="flex flex-col justify-between w-full border border-gray-200 bg-white p-4 rounded-lg shadow-sm transition hover:shadow-md hover:border-blue-500">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-blue-950 line-clamp-2">{name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
        {category && (
          <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
            {category}
          </span>
        )}
        {serviceCount !== undefined && (
          <p className="mt-1 text-xs text-gray-500">{serviceCount} service{serviceCount !== 1 ? 's' : ''} available</p>
        )}
      </div>
      <button
        type="button"
        onClick={onViewClick}
        className="mt-3 w-full rounded-md bg-blue-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        View Services
      </button>
    </div>
  )
}

// ---------------- Page ----------------
interface Service {
  id: string
  name: string
  description: string
  category: string
}

interface ServicesPageProps {
  services?: Service[]
}

export default function AllServicesPage({ services }: ServicesPageProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const safeServices = useMemo(() => services ?? servicesData, [services])

  // ---------------- CATEGORY LIST ----------------
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(safeServices.map((s) => s.category)))],
    [safeServices]
  )

  // ---------------- FILTERED + SEARCHED ----------------
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return safeServices.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [safeServices, searchQuery, selectedCategory])

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // ---------------- COUNT BY CATEGORY ----------------
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    safeServices.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return counts
  }, [safeServices])

  const handleViewClick = (category: string) => {
    const page = serviceCategoryPageMap[category] || 'services'
    router.push(`/${page}`)
  }

  return (
    <HomeSection>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h2"
          title="Government Services"
          description="Browse government services by category"
          showBack
          onBack={() => router.push('/')}
        />

        {/* Search & Filter */}
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

        <p className="mb-6 text-sm text-gray-600">
          Showing {paginatedServices.length} of {filteredServices.length} services
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedServices.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-gray-500">
              No matching services found.
            </div>
          ) : (
            paginatedServices.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                category={service.category}
                serviceCount={categoryCounts[service.category]}
                onViewClick={() => handleViewClick(service.category)}
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
