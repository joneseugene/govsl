import AllMDAServer from '@/components/section/AllSection/MdaAll/MdaAll.server';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function PublicationsPage({ searchParams }: PageProps) {
  return <AllMDAServer searchParams={searchParams} />;
}
