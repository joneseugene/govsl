import Header from '@/components/layout/header/page';
import { homeNavLinks } from '@/libs/consts/nav.const';
import HeroSection from '@/components/section/HomeSection/HeroSection/HeroSection.server';
import PressReleaseSectionServer from '@/components/section/HomeSection/PressRelease/PressReleaseSection.server';
import AppointmentSectionServer from '@/components/section/HomeSection/Appointment/AppointmentSection.server';
import NewsSectionServer from '@/components/section/HomeSection/News/NewsSection.server';
import PublicationSectionServer from '@/components/section/HomeSection/Publication/PublicationSection.server.tsx';
import PopularServicesSectionServer from '@/components/section/HomeSection/PopularService/PopularServiceSection.server';
import MDASectionServer from '@/components/section/HomeSection/Mda/MdaSection.server';
import Footer from '@/components/layout/footer/page';
import AnnouncementSectionServer from '@/components/section/HomeSection/AnnouncementSection/AnnouncementSection.server';

export default function Page() {
  return (
    <>
      <Header links={homeNavLinks} />

      <main>
        {/* Main SEO Heading */}
        <h1 className="sr-only">Government of Sierra Leone Official Public Information Portal</h1>

        <HeroSection />

        <section aria-labelledby="press-release-heading">
          <h2 id="press-release-heading" className="sr-only">
            Government Press Releases
          </h2>
          <PressReleaseSectionServer />
        </section>

        <section aria-labelledby="announcement-heading">
          <h2 id="announcement-heading" className="sr-only">
            Government Announcements
          </h2>
          <AnnouncementSectionServer />
        </section>

        <section aria-labelledby="news-heading">
          <h2 id="news-heading" className="sr-only">
            Latest Government News
          </h2>
          <NewsSectionServer />
        </section>

        <section aria-labelledby="publication-heading">
          <h2 id="publication-heading" className="sr-only">
            Government Publications
          </h2>
          <PublicationSectionServer />
        </section>

        <section aria-labelledby="appointment-heading">
          <h2 id="appointment-heading" className="sr-only">
            Government Appointments
          </h2>
          <AppointmentSectionServer />
        </section>

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="sr-only">
            Popular Government Services
          </h2>
          <PopularServicesSectionServer />
        </section>

        <section aria-labelledby="mda-heading">
          <h2 id="mda-heading" className="sr-only">
            Ministries Departments and Agencies
          </h2>
          <MDASectionServer />
        </section>
      </main>

      <Footer />
    </>
  );
}
