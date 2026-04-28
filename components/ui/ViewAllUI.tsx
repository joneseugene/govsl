import { ReactNode } from 'react'

interface SeeAllButtonProps {
  onClick: () => void
  children?: ReactNode
  className?: string
  buttonClassName?: string
  alignment?: 'left' | 'center' | 'right'
  showArrow?: boolean
}

export function ViewAllButton({
  onClick,
  children = 'See all',
  className = '',
  buttonClassName = '',
  alignment = 'left',
  showArrow = true
}: SeeAllButtonProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={`mt-16 ${alignmentClasses[alignment]} ${className}`}>
      <button
        onClick={onClick}
        className={`
          group
          inline-flex items-center gap-2
          text-[#1D70B8] hover:text-[#003366]
          font-medium text-[19px]
          transition-all duration-300 ease-out
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[#1D70B8]/40 focus-visible:ring-offset-2
          cursor-pointer
          ${buttonClassName}
        `}
      >
        <span className="
          group-hover:underline group-hover:underline-offset-4
          decoration-2 transition-all duration-200
        ">
          {children}
        </span>
        {showArrow && (
          <span className="
            transition-all duration-300 ease-out
            opacity-0 -translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0
          ">
            →
          </span>
        )}
      </button>
    </div>
  )
}