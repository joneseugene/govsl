'use client'

import { sampleMDAs } from '@/libs/sampleData'
import { HomeSection } from '../../../ui/HomeSections'
import { SectionHeading } from '../../../ui/SectionHeading'
import { ViewAllButton } from '../../../ui/ViewAllUI'
import { MdaItem } from './MdaItem'
import { homeSections } from '@/libs/consts/home.const'

interface MinistriesSectionProps {
    id?: string
    onNavigate: (page: string) => void
}

export function MdaSection({ id, onNavigate }: MinistriesSectionProps) {
    // Show first 10 MDAs
    const mdas = sampleMDAs.slice(0, 10)

    return (
        <HomeSection id={id ?? homeSections.mda.id} className="bg-white px-4">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <SectionHeading
                    level="h2"
                    title="Ministries, Departments & Agencies"
                />

                {/* List of MDAs */}
                <div className="space-y-6 sm:space-y-8 md:space-y-10">
                    {mdas.map((mda) => (
                        <MdaItem
                            key={mda.id}
                            name={mda.name}
                            onClick={onNavigate}
                            variant="compact"
                        />
                    ))}
                </div>

                {/* View All */}
                <div className="mt-6 text-center">
                    <ViewAllButton
                        onClick={() => onNavigate(homeSections.mda.routes.all)}
                    >
                        See all Ministries, Departments & Agencies →
                    </ViewAllButton>
                </div>
            </div>
        </HomeSection>
    )
}
