import Header from "@/components/layout/header/page"
import { homeNavLinks } from "@/libs/consts/nav.const"
import HeroSection from "@/components/section/HomeSection/HeroSection/HeroSection.server"
import PressReleaseSectionServer from "@/components/section/HomeSection/PressRelease/PressReleaseSection.server"
import AppointmentSectionServer from "@/components/section/HomeSection/Appointment/AppointSection.server"

export default function Page() {
    return (
        <>
            {/* CLIENT ONLY COMPONENTS */}
            <Header links={homeNavLinks} />

            <HeroSection suggestions={[]} />

            {/* SERVER SECTIONS */}
            <PressReleaseSectionServer />
            <AppointmentSectionServer />
            {/* 
            <GovernmentNewsSection />
            <PublicationsSection />
            <PopularServicesSection />
            <MoreSection />
            <ServiceSection />
            <MdaSection />

            <Footer /> */}
        </>
    )
}