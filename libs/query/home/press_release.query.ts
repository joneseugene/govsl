import { getPressReleases } from '@/libs/api/press.releases.api';

export const pressReleaseQueryKey = ['home-press-releases', 'approved', 1, 5];

export async function getHomePressReleases() {
  return getPressReleases({
    status: 'approved',
    page: 1,
    limit: 5,
  });
}
