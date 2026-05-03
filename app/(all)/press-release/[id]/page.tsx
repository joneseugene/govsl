import { getPressReleaseById } from '@/libs/api/press.releases.api';
import { PressReleaseDetailUI } from '@/components/section/DetailSection/PressRelease/PressReleaseDetail';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PressReleasePage({ params }: PageProps) {
  const { id } = await params;

  const pressRelease = await getPressReleaseById(id);

  if (!pressRelease) return notFound();

  return <PressReleaseDetailUI pressRelease={pressRelease} />;
}
