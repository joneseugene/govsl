import { SectionHeading } from '@/components/ui/SectionHeading';
import HeroSectionClient from './HeroSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHeroLastUpdated, heroLastUpdatedQueryKey } from '@/libs/query/home/search.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function HeroSection() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: heroLastUpdatedQueryKey,
    queryFn: async () => {
      const data = await getHeroLastUpdated();
      return toPlain(data);
    },
  });

  const lastUpdated = await queryClient.getQueryData<string>(heroLastUpdatedQueryKey);

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'No data available';

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <section className="border-b border-gray-200 bg-white px-6 py-16 lg:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-4 md:space-y-6">
            <SectionHeading
              level="h2"
              title="Welcome to GOV.SL"
              description={
                <>
                  Your go-to source for verified government information, official press <br />{' '}
                  releases, announcements, and public communications in Sierra Leone.
                </>
              }
            />

            <HeroSectionClient />

            <p className="text-md text-center text-gray-500 md:text-left">
              All content verified by Government of Sierra Leone | Last updated: {formattedDate}
            </p>
          </div>
        </div>
      </section>
    </HydrationBoundary>
  );
}
