import { SectionHeading } from '@/components/ui/SectionHeading';
import HeroSectionClient from './HeroSection.client';
import { getLastUpdatedDate } from '@/libs/api/global.search.api';

export default async function HeroSection() {
  const lastUpdated = await getLastUpdatedDate();

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'No data available';

  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-8 border-b border-gray-200">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-8 md:space-y-10">
          <SectionHeading
            level="h1"
            title="Welcome to GOV.SL"
            description={
              <>
                Your go-to source for verified government information,
                <br />
                official press releases, announcements, and public communications in Sierra Leone.
              </>
            }
          />

          <HeroSectionClient />

          <p className="text-sm text-gray-500 text-center md:text-left pt-2">
            All content officially verified • Last updated: {formattedDate}
          </p>
        </div>
      </div>
    </section>
  );
}
