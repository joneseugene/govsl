import PressReleaseSectionClient from '@/components/section/HomeSection/PressRelease/PressReleaseSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { getHomePressReleases } from '@/libs/query/home/press_release.query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const pressReleaseQueryKey = ['home-press-releases', 'approved', 1, 5];

export default async function PressReleaseSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pressReleaseQueryKey,
    queryFn: async () => {
      const data = await getHomePressReleases();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <PressReleaseSectionClient />
    </HydrationBoundary>
  );
}
