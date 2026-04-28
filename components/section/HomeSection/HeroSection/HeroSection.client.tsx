'use client'

import Search from "@/components/ui/SearchUI"
import { useRouter } from "next/navigation"

interface HeroSearchProps {
    suggestions: any[]
    isLoading?: boolean
}

export default function HeroSectionClient({
    suggestions,
    isLoading = false,
}: HeroSearchProps) {
    const router = useRouter()

    const handleSearch = (query: string) => {
        // You can either:
        // 1. redirect to search page
        router.push(`/search?q=${encodeURIComponent(query)}`)
    }

    const handleSelect = (suggestion: any) => {
        router.push(`/search?q=${encodeURIComponent(suggestion.title)}`)
    }

    return (
        <div className="max-w-2xl mx-auto md:mx-0">
            <Search
                onSearch={handleSearch}
                onSelect={handleSelect}
                suggestions={suggestions}
                isLoading={isLoading}
                placeholder="Search government services, news, policies..."
            />
        </div>
    )
}