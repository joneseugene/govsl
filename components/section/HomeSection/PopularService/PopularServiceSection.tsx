'use client'

import { useState, useEffect } from 'react'

import {
  mockPopularCategories,
  popularCategoryDescriptions,
  popularCategoryPageMap,
} from '@/libs/sampleData'
import { SectionHeading } from '../../../ui/SectionHeading'
import { HomeSection } from '../../../ui/HomeSections'
import { homeSections } from '@/libs/consts/home.const'
import { ViewAllButton } from '../../../ui/ViewAllUI'
import { PopularCategoryItem } from './PopularServiceItem'

export default function PopularServicesSection({
  id,
  onNavigate,
}: {
  id?: string
  onNavigate: (path: string) => void
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryClick = (category: string) => {
    const popularService = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    onNavigate(`/services/category/${popularService}`)
  }

  return (
    <HomeSection id={homeSections.popularServices.id}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          level="h2"
          title="Popular Services"
        />

        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-[19px] text-[#505A5F]">
              Loading popular services…
            </p>
          </div>
        ) : mockPopularCategories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[19px] text-[#505A5F] italic">
              No popular services available at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-14">
            {mockPopularCategories.map(category => (
              <PopularCategoryItem
                key={category}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <ViewAllButton onClick={() => onNavigate(homeSections.popularServices.routes.all)}>
          See all Popular Services
        </ViewAllButton>

      </div>
    </HomeSection>
  )
}