import PressReleaseSectionClient from '@/components/section/HomeSection/PressRelease/PressReleaseSection.client';
import { toPlain } from '@/libs/functions';
import { getHomePressReleases } from '@/libs/query/home/press_release.query';

export const revalidate = 120;

export default async function PressReleaseSectionServer() {
  const data = await getHomePressReleases();

  return <PressReleaseSectionClient initialData={toPlain(data)} />;
}