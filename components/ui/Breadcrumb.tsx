import { ChevronRightIcon, HomeIcon } from "lucide-react"

// components/Breadcrumb.tsx
interface BreadcrumbItem {
    label: string
    page?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    onNavigate: (page: string) => void
    className?: string
    variant?: 'default' | 'minimal' | 'government'
}

export function Breadcrumb({
    items,
    onNavigate,
    className = '',
    variant = 'government'
}: BreadcrumbProps) {
    if (items.length === 0) return null

    const variants = {
        default: {
            container: 'mb-8',
            active: 'text-gray-900 font-semibold',
            inactive: 'text-gray-600 hover:text-gray-900',
            separator: 'text-gray-400'
        },
        minimal: {
            container: 'mb-6',
            active: 'text-gray-800',
            inactive: 'text-gray-500 hover:text-gray-700',
            separator: 'text-gray-300'
        },
        government: {
            container: 'mb-10',
            active: 'text-[#003366] font-semibold',
            inactive: 'text-[#1D70B8] hover:text-[#003366]',
            separator: 'text-[#505A5F]/50'
        }
    }

    const style = variants[variant]

    return (
        <nav
            aria-label="Breadcrumb"
            className={`${style.container} ${className}`}
        >
            <ol className="
        flex flex-wrap items-center gap-x-2 gap-y-1.5
        text-[15px] sm:text-[16px]
      ">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    const hasLink = !isLast && item.page

                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className="flex items-center gap-x-2"
                        >
                            {/* Separator */}
                            {index > 0 && (
                                <ChevronRightIcon
                                    className={`${style.separator}`}
                                />
                            )}

                            {/* Link */}
                            {hasLink ? (
                                <button
                                    type="button"
                                    onClick={() => onNavigate(item.page!)}
                                    className={`
                    relative inline-flex items-center gap-1.5
                    ${style.inactive}
                    font-medium
                    transition-colors
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-[#1D70B8]/40
                    focus-visible:ring-offset-2
                    rounded-sm
                    group
                  `}
                                >
                                    {index === 0 && <HomeIcon />}
                                    {item.label}

                                    {/* Hover underline */}
                                    <span className="
                    absolute left-0 -bottom-0.5
                    h-0.5 w-full
                    bg-current opacity-20
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-200
                    origin-left
                  " />
                                </button>
                            ) : (
                                <span
                                    className={`
                    inline-flex items-center gap-1.5
                    ${style.active}
                  `}
                                    aria-current="page"
                                >
                                    {index === 0 && <HomeIcon />}
                                    {item.label}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>

            {/* Government divider */}
            {variant === 'government' && items.length > 1 && (
                <div className="
          mt-4 h-px
          bg-linear-to-r
          from-transparent via-[#1D70B8]/10 to-transparent
        " />
            )}
        </nav>
    )
}
