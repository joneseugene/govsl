'use client'

import React from 'react'

interface MdaItemProps {
    name: string
    onClick: (slug: string) => void
    className?: string
    showUnderline?: boolean
    variant?: 'default' | 'compact'
}

export function MdaItem({
    name,
    onClick,
    className = '',
    showUnderline = true,
    variant = 'default'
}: MdaItemProps) {
    const isCompact = variant === 'compact'

    const handleClick = () => {
        const slug = name.toLowerCase().replace(/\s+/g, '-')
        onClick(`ministry-${slug}`)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`
        group block w-full text-left
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#1D70B8]/40 focus-visible:ring-offset-2
        transition-all duration-200
        ${className}
      `}
        >
            <h5
                className={`
          text-[#1D70B8] group-hover:text-[#003366]
          ${showUnderline ? 'group-hover:underline group-hover:underline-offset-[6px]' : ''}
          decoration-2 decoration-[#1D70B8]/30
          ${isCompact ? 'text-base sm:text-lg' : 'text-[17px] sm:text-[21px] lg:text-[23px]'}
        `}
            >
                {name}
            </h5>
        </button>
    )
}
