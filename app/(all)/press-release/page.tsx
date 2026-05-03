import AllPressReleasesSectionServer from '@/components/section/AllSection/PressReleaseAll/PressReleaseAll.server';

export default function AllPressReleasesPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  console.log('PAGE searchParams:', searchParams);
  return <AllPressReleasesSectionServer searchParams={searchParams} />;
}
