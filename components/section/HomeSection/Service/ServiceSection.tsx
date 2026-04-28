'use client'

import { useState, useMemo } from 'react'
import { SectionHeading } from '../../../ui/SectionHeading'
import { HomeSection } from '../../../ui/HomeSections'
import { servicesData, serviceCategoryPageMap } from '@/libs/sampleData'
import { homeSections } from '@/libs/consts/home.const'
import { ViewAllButton } from '../../../ui/ViewAllUI'

interface ServiceSectionProps {
    id?: string
    onNavigate: (page: string) => void
}

export function ServiceSection({ id, onNavigate }: ServiceSectionProps) {
    const [showAll, setShowAll] = useState(false)

    // Show first 8 by default, rest on "See All"
    const displayed = showAll ? servicesData : servicesData.slice(0, 8)

    return (
        <HomeSection id={id ?? homeSections.service.id}>
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <SectionHeading
                    level="h2"
                    title="Services"
                />

                {/* Service List */}
                <div className="space-y-4">
                    {displayed.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => {
                                const page = serviceCategoryPageMap[service.category] || 'services'
                                onNavigate(page)
                            }}
                            className="w-full text-left rounded-xl bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold text-[#003366]">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.category}</p>
                        </button>
                    ))}
                    {/* View All */}
                    <ViewAllButton onClick={() => onNavigate(homeSections.service.routes.all)}>
                        See all Services
                    </ViewAllButton>
                </div>

            </div>
        </HomeSection>
    )
}
