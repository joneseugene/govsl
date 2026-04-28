'use client'

import { formatDate } from '@/libs/functions'
import { mockNewsItems } from '@/libs/sampleData'
import { useState, useEffect } from 'react'
import { SectionHeading } from '../../../ui/SectionHeading'
import { HomeSection } from '../../../ui/HomeSections'
import { homeSections } from '@/libs/consts/home.const'
import { ViewAllButton } from '../../../ui/ViewAllUI'
import { NewsItem } from './NewsItem'


export default function GovernmentNewsSection({
  id,
  onNavigate,
}: {
  id?: string
  onNavigate: (path: string) => void
}) {
  const [newsItems, setNewsItems] = useState<typeof mockNewsItems>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setNewsItems(mockNewsItems.slice(0, 4))
      setLoading(false)
    }, 700)
  }, [])

  return (
    <HomeSection id={homeSections.news.id}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          level="h2"
          title="Government News & Updates"
          description="Official updates from ministries, departments, and agencies"
        />

        {loading ? (
          <div className="
            text-center py-16
            text-[19px] text-[#505A5F]
          ">
            Loading latest news...
          </div>
        ) : newsItems.length === 0 ? (
          <div className="
            text-center py-16
            text-[19px] text-[#505A5F] italic
          ">
            No recent government news available.
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {newsItems.map((item) => (
              <NewsItem
                key={item.id}
                item={item}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <ViewAllButton onClick={() => onNavigate(homeSections.news.routes.all)}>
          See all Government News & Updates
        </ViewAllButton>

      </div>
    </HomeSection>
  )
}