'use client'

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    maxPageButtons?: number
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxPageButtons = 7,
}: PaginationProps) {
    if (totalPages <= 1) return null

    // Calculate pages to display
    const pages: number[] = []
    for (let i = 1; i <= totalPages; i++) pages.push(i)

    let visiblePages = pages
    if (totalPages > maxPageButtons) {
        const half = Math.floor(maxPageButtons / 2)
        if (currentPage <= half) {
            visiblePages = pages.slice(0, maxPageButtons)
        } else if (currentPage >= totalPages - half) {
            visiblePages = pages.slice(totalPages - maxPageButtons)
        } else {
            visiblePages = pages.slice(currentPage - half - 1, currentPage + half)
        }
    }

    return (
        <div className="mt-6 flex flex-wrap justify-end  items-center gap-2">
            {/* Previous */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
                ← Previous
            </button>

            {/* Page numbers */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                        page === currentPage
                            ? 'bg-blue-900 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
                Next →
            </button>
        </div>
    )
}
