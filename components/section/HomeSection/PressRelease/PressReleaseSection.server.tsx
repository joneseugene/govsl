import PressReleaseSectionClient from '@/components/section/HomeSection/PressRelease/PressReleaseSection.client';
import ErrorUI from '@/components/ui/ErrorUI';
import { getPressReleases } from '@/libs/api/press.releases.api';

export default async function PressReleaseSectionServer() {
  const result = await getPressReleases({
    status: 'approved',
    page: 1,
    limit: 5,
  });

  // Handle Error
  if (result.error) {
    return (
      <ErrorUI
        title="Unable to load Press Releases"
        message={result.error}
        retryPath="/"
      />
    );
  }

  return <PressReleaseSectionClient items={result.data} />;
}
