import { ReactNode } from 'react'

interface HomeSectionProps {
    id?: string
    children: ReactNode
    className?: string
    backgroundColor?: 'white' | 'gray' | 'blue'
    hasBorderTop?: boolean
    padding?: 'default' | 'large' | 'small' | 'none'
}

export function HomeSection({
    id,
    children,
    className = '',
    backgroundColor = 'white',
    hasBorderTop = true,
    padding = 'default',
}: HomeSectionProps) {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        blue: 'bg-blue-50'
    }

    const paddingClasses = {
        default: 'px-5 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24',
        large: 'px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40',
        small: 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        none: ''
    }

    const borderClass = hasBorderTop ? 'border-t border-gray-100' : ''

    return (
        <section
            id={id}
            className={`
        ${bgClasses[backgroundColor]}
        ${paddingClasses[padding]}
        ${borderClass}
        ${className}
      `}
        >
            {children}
        </section>
    )
}