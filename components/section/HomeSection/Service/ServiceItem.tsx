interface ServiceCategoryItemProps {
    category: string
    onClick: (category: string) => void
    className?: string
    serviceCategoryPageMap?: Record<string, string>
}

export function ServiceCategoryItem({
    category,
    onClick,
    className = '',
    serviceCategoryPageMap = {}
}: ServiceCategoryItemProps) {
    const handleClick = () => {
        const route = serviceCategoryPageMap[category] || 'services'
        onClick(route)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`
        group flex items-center justify-between w-full text-left
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-[#1D70B8]/50 focus-visible:ring-offset-4
        focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950
        ${className}
      `}
        >
            {/* Heading text with flexible width */}
            <h5
                className={`
          flex-1 truncate
          text-1xl sm:text-3xl lg:text-3xl xl:text-[2.75rem]
          font-extrabold tracking-tight
          text-[#1D70B8] group-hover:text-[#003366]
          transition-colors duration-300 ease-out
        `}
            >
                {category}
            </h5>

            {/* Sleek interactive right arrow */}
            <span className="ml-4 shrink-0 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 ease-out">
                <svg
                    className="h-6 w-6 transform transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </span>
        </button>
    )
}
