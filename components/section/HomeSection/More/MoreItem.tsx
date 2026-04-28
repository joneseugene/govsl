interface MoreItemProps {
    item: {
        name: string
        page: string
        description: string
    }
    onClick: (item: { name: string; page: string; description: string; }) => void
    className?: string
    variant?: 'default' | 'compact'
}

export function MoreItem({
    item,
    onClick,
    className = '',
    variant = 'default'
}: MoreItemProps) {
    const isCompact = variant === 'compact'

    return (
        <div>
            <button
                type="button"
                onClick={() => onClick(item)}
                className={`
          group text-left
          ${isCompact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}
          rounded-xl
          transition-all duration-300
          ease-out
          bg-white
          flex flex-col
          h-full
          ${className}
        `}
            >
                <h6
                    className={`
            font-semibold
            text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
            text-[#003366] group-hover:text-[#003366]
            mb-3 lg:mb-4
            transition-colors duration-200
            leading-tight
            flex items-center
            ${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl lg:text-2xl'}
          `}
                >
                    {item.name}
                    <span className="
            inline-block
            ml-3
            opacity-0
            -translate-x-2
            group-hover:opacity-100
            group-hover:translate-x-0
            transition-all duration-200
            text-[#003366]
          ">
                        →
                    </span>
                </h6>

                <p className={`
          text-gray-600
          leading-relaxed
          mb-4
          ${isCompact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}
        `}>
                    {item.description}
                </p>
            </button>
        </div>
    )
}