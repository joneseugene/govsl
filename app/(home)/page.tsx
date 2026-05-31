import Header from '@/components/layout/header/page';
import { footerNavLinks, homeNavLinks } from '@/libs/consts/nav.const';
import HeroSection from '@/components/section/HomeSection/HeroSection/HeroSection.server';
import PressReleaseSectionServer from '@/components/section/HomeSection/PressRelease/PressReleaseSection.server';
import AppointmentSectionServer from '@/components/section/HomeSection/Appointment/AppointmentSection.server';
import NewsSectionServer from '@/components/section/HomeSection/News/NewsSection.server';
import PublicationSectionServer from '@/components/section/HomeSection/Publication/PublicationSection.server.tsx';
import PopularServicesSectionServer from '@/components/section/HomeSection/PopularService/PopularServiceSection.server';
import MDASectionServer from '@/components/section/HomeSection/Mda/MdaSection.server';
import Footer from '@/components/layout/footer/page';

export default function Page() {
  return (
    <>
      {/* CLIENT ONLY COMPONENTS */}
      <Header links={homeNavLinks} />
      <HeroSection />
      {/* SERVER SECTIONS */}
      <PressReleaseSectionServer />
      <NewsSectionServer />
      <PublicationSectionServer />
      <AppointmentSectionServer />
      <PopularServicesSectionServer />
      <MDASectionServer />
      {/* END SERVER SECTIONS */}
      <Footer />
    </>
  );
}
