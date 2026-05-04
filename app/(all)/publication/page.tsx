import AllPublicationsServer from "@/components/section/AllSection/PublicationAll/PublicationAll.server";

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function PublicationsPage({ searchParams }: PageProps) {
  return <AllPublicationsServer searchParams={searchParams} />;
}