'use client'

import { useRouter } from "next/navigation"
import { homeNavLinks } from "@/libs/consts/nav.const"
import Footer from "@/components/layout/footer/page"
import Header from "@/components/layout/header/page"
import AppointmentNoticesSection from "@/components/section/HomeSection/Appointment/AppointmentSection.client"
import Hero from "@/components/section/HomeSection/Hero/HeroSection"
import { MdaSection } from "@/components/section/HomeSection/Mda/MdaSection"
import { MoreSection } from "@/components/section/HomeSection/More/MoreSection"
import GovernmentNewsSection from "@/components/section/HomeSection/News/NewsSection"
import PopularServicesSection from "@/components/section/HomeSection/PopularService/PopularServiceSection"
import PublicationsSection from "@/components/section/HomeSection/Publication/PublicationSection"
import { ServiceSection } from "@/components/section/HomeSection/Service/ServiceSection"

export default function HomePageClient() {
    const router = useRouter()

    const handleNavigate = (page: string) => {
        if (page === '/' || page === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        if (page.startsWith('/')) {
            router.push(page)
        }
    }

    return (
        <>
            <Header links={homeNavLinks} onNavigate={handleNavigate} />

            <Hero onSearch={() => { }} onSelect={() => { }} suggestions={[]} />

            <GovernmentNewsSection onNavigate={handleNavigate} />
            <PublicationsSection onNavigate={handleNavigate} />
            <PopularServicesSection onNavigate={handleNavigate} />
            <MoreSection onNavigate={handleNavigate} />
            <ServiceSection onNavigate={handleNavigate} />
            <MdaSection onNavigate={handleNavigate} />

            <Footer onNavigate={handleNavigate} />
        </>
    )
}