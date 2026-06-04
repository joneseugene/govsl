import PressReleaseSectionClient from '@/components/section/HomeSection/PressRelease/PressReleaseSection.client';
import { getQueryClient } from '@/libs/functions';
import { getHomePressReleases } from '@/libs/query/home/press_release.query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const pressReleaseQueryKey = ["home-press-releases", "approved", 1, 5];

export default async function PressReleaseSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pressReleaseQueryKey,
    queryFn: getHomePressReleases,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PressReleaseSectionClient />
    </HydrationBoundary>
  );
}
