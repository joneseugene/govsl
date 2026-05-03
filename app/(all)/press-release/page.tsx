import AllPressReleasesSectionServer from '@/components/section/AllSection/PressReleaseAll/PressReleaseAll.server';

export default function AllPressReleasesPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  return <AllPressReleasesSectionServer searchParams={searchParams} />;
}
