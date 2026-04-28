'use client'

import { mockPublications } from '@/libs/sampleData'
import { useState, useEffect } from 'react'
import { SectionHeading } from '../../../ui/SectionHeading'
import { HomeSection } from '../../../ui/HomeSections'
import { homeSections } from '@/libs/consts/home.const'
import { ViewAllButton } from '../../../ui/ViewAllUI'
import { PublicationItem } from './PublicationItem'


export default function PublicationsSection({
    id,
    onNavigate,
}: {
    id?: string
    onNavigate: (path: string) => void
}) {
    const [publications, setPublications] = useState<typeof mockPublications>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setPublications(mockPublications.slice(0, 4))
            setLoading(false)
        }, 800)
    }, [])

    const handleViewPublication = (pubId: string | number) => {
        const id = typeof pubId === 'number' ? pubId.toString() : pubId
        onNavigate(homeSections.publication.routes.detail(id))
    }

    return (
        <HomeSection id={homeSections.publication.id}>
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    level="h2"
                    title="Official Publications & Reports"
                    description="Policy documents, strategic plans, annual reports and government publications."
                />

                {loading ? (
                    <div className="
            text-center py-16
            text-[19px] text-[#505A5F]
            ">
                        Loading official publications...
                    </div>
                ) : publications.length === 0 ? (
                    <div className="space-y-8 text-center py-12">
                        <p className="
              text-[19px] text-[#505A5F] italic
            ">
                            No recent publications available at this time.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-12 sm:space-y-14 mb-12">
                            {publications.map((pub) => (
                                <PublicationItem
                                    key={pub.id}
                                    publication={pub}
                                    onView={handleViewPublication}
                                />
                            ))}
                        </div>

                        {/* View All */}
                        <ViewAllButton onClick={() => onNavigate(homeSections.publication.routes.all)}>
                            See all Publications & Reports
                        </ViewAllButton>
                    </>
                )}

            </div>
        </HomeSection>
    )
}