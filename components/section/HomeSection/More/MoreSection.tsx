'use client'

import { mockMore } from '@/libs/sampleData'
import { useState } from 'react'
import { SectionHeading } from '../../../ui/SectionHeading'
import { HomeSection } from '../../../ui/HomeSections'
import { homeSections } from '@/libs/consts/home.const'
import { MoreItem } from './MoreItem'

interface LinkItem {
    name: string
    page: string
    description: string
}

interface MoreSectionProps {
    id?: string
    onNavigate: (page: string) => void
}

export function MoreSection({ id, onNavigate }: MoreSectionProps) {
    const [modal, setModal] = useState<{ isOpen: boolean; title: string }>({
        isOpen: false,
        title: '',
    })

    const handleClick = (item: LinkItem) => {
        onNavigate(item.page)
    }

    return (
        <>
            <HomeSection id={homeSections.more.id}>
                <div className="mx-auto max-w-5xl">

                    {/* Header */}
                    <SectionHeading
                        level="h2"
                        title="More on GOV.SL"
                    />
                    {/* Grid Layout */}
                    <div className="
                        grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2
                        gap-1 sm:gap-4 lg:gap-6
                    ">
                        {mockMore.map((item, index) => (
                            <MoreItem
                                key={index}
                                item={item}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                </div>
            </HomeSection>
        </>
    )
}