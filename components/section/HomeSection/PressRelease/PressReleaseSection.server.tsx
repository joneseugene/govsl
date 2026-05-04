import PressReleaseSectionClient from '@/components/section/HomeSection/PressRelease/PressReleaseSection.client';
import { getPressReleases } from '@/libs/api/press.releases.api';
import { redirect } from 'next/navigation';

export default async function PressReleaseSectionServer() {
  const result = await getPressReleases({
    status: 'approved',
    page: 1,
    limit: 5,
  });

  // if (result.error) {
  //   redirect(`/error?message=${encodeURIComponent(result.error)}`);
  // }

  return <PressReleaseSectionClient items={result.data} />;
}
