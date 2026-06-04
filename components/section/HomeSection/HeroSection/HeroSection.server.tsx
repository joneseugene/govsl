import { SectionHeading } from '@/components/ui/SectionHeading';
import HeroSectionClient from './HeroSection.client';
import { getQueryClient } from '@/libs/functions';
import { getHeroLastUpdated, heroLastUpdatedQueryKey } from '@/libs/query/home/search.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function HeroSection() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: heroLastUpdatedQueryKey,
    queryFn: getHeroLastUpdated,
  });

  const lastUpdated = await queryClient.getQueryData<string>(
    heroLastUpdatedQueryKey
  );

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No data available";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <section className="bg-white py-16 md:py-24 px-6 lg:px-8 border-b border-gray-200">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-4 md:space-y-6">
          <SectionHeading
            level="h1"
            title="Welcome to GOV.SL"
            description={
              <>
                Your go-to source for verified government information, official press <br />{' '}
                releases, announcements, and public communications in Sierra Leone.
              </>
            }
          />

          <HeroSectionClient />

          <p className="text-md text-gray-500 text-center md:text-left">
            All content verified by Government of Sierra Leone | Last updated: {formattedDate}
          </p>
        </div>
      </div>
    </section>
    </HydrationBoundary>
  );
}
