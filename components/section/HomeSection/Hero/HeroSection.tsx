'use client'

import Search from "../../../ui/SearchUI"
import { SectionHeading } from "../../../ui/SectionHeading"

interface HeroProps {
  onSearch: (query: string) => void
  onSelect: (suggestion: any) => void
  suggestions: any[]
  isLoading?: boolean
  lastUpdated?: string
}

export default function Hero({
  onSearch,
  onSelect,
  suggestions,
  isLoading = false,
  lastUpdated = 'January 2025',
}: HeroProps) {
  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-8 border-b border-gray-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-8 md:space-y-10">
          <SectionHeading
            level="h1"
            title="Welcome to GOV.SL"
            description={
              <>
                Your go-to source for verified government information,<br />
                official press releases, announcements, and public communications in Sierra Leone.
              </>
            }
          />

          {/* Search  */}
          <div className="max-w-2xl mx-auto md:mx-0">
            <Search
              onSearch={onSearch}
              onSelect={onSelect}
              suggestions={suggestions}
              isLoading={isLoading}
              placeholder="Search government services, news, policies..."
            />
          </div>

          {/* Hero Footer */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left pt-2">
            All content officially verified • Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </section>
  )
}