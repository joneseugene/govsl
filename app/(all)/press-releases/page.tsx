import AllPressReleasesSectionServer from '@/components/section/AllSection/PressReleaseAll/PressReleaseAll.server';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function AllPressReleasesPage({ searchParams }: PageProps) {
  return <AllPressReleasesSectionServer searchParams={searchParams} />;
}
