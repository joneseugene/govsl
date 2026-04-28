import { mockPopularCategories } from "@/libs/sampleData"

interface PopularCategoryItemProps {
  category: string
  description?: string
  onClick: (category: string) => void
  className?: string
  showUnderline?: boolean
  variant?: 'default' | 'compact'
}

export function PopularCategoryItem({
  category,
  description,
  onClick,
  className = '',
  showUnderline = true,
  variant = 'default'
}: PopularCategoryItemProps) {
  const isCompact = variant === 'compact'

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`
        group block w-full text-left
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#003366]/50 focus-visible:ring-offset-2
        rounded-lg transition-colors
        ${className}
      `}
    >
      <h5
        className={`
          text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px]
          text-[#003366] group-hover:text-[#003366]
          ${showUnderline ? 'group-hover:underline group-hover:underline-offset-[6px]' : ''}
          decoration-2 decoration-[#003366]/40
          leading-tight
          mb-3
          ${isCompact ? 'text-lg sm:text-xl' : 'text-[20px] sm:text-[18px]'}
        `}
      >
        {category}
      </h5>

      <p className={`
        leading-[1.58] text-[#505A5F]
        ${isCompact ? 'text-base' : 'text-[19px]'}
      `}>
        {description}
      </p>
    </button>
  )
}