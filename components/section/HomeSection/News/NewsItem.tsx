import { homeSections } from "@/libs/consts/home.const"
import { formatDate } from "@/libs/functions"

interface NewsItemProps {
    item: {
        id: string | number
        headline: string
        ministry?: string
        date?: string
        summary?: string
        category?: string
    }
    onNavigate: (path: string) => void
    className?: string
    showVerified?: boolean
    variant?: 'default' | 'compact'
    useHomeSections?: boolean
}

export function NewsItem({
    item,
    onNavigate,
    className = '',
    showVerified = true,
    variant = 'default',
    useHomeSections = true
}: NewsItemProps) {
    const isCompact = variant === 'compact'

    const handleClick = () => {
        if (useHomeSections) {
            onNavigate(homeSections.news.routes.detail(item.id))
        } else {
            onNavigate(`news-${item.id}`)
        }
    }

    return (
        <div className={`group ${className}`}>
            {/* Meta line */}
            <div className={`
        flex flex-wrap items-center gap-3
        text-[#505A5F] mb-3
        ${isCompact ? 'text-sm' : 'text-[15px] sm:text-[16px]'}
      `}>
                <span className="font-medium text-[#333]">
                    {item.ministry ?? 'Unknown Ministry'}
                </span>
                {item.date && (
                    <>
                        <span className="text-gray-400">•</span>
                        <time>{formatDate(item.date)}</time>
                    </>
                )}

                {/* Optional category badge */}
                {item.category && !isCompact && (
                    <>
                        <span className="text-gray-400">•</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            {item.category}
                        </span>
                    </>
                )}
            </div>

            {/* Clickable headline */}
            <button
                type="button"
                onClick={handleClick}
                className="
          text-left w-full
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/50 rounded
        "
            >
                <h6 className={`
          text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
          text-[#1D70B8] group-hover:text-[#003366]
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-colors
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[20px] sm:text-[22px] md:text-[24px]'}
        `}>
                    {item.headline}
                </h6>
            </button>

            {/* Optional summary */}
            {item.summary && !isCompact && (
                <p className="mt-3 text-[17px] text-gray-600 leading-relaxed">
                    {item.summary.length > 150 ? `${item.summary.slice(0, 150)}…` : item.summary}
                </p>
            )}

            {/* Verified trust signal */}
            {showVerified && (
                <div className={`
          mt-4 flex items-center gap-1.5
          font-medium text-[#008A3C]
          ${isCompact ? 'text-sm' : 'text-[15px]'}
        `}>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Official & Verified
                </div>
            )}
        </div>
    )
}
