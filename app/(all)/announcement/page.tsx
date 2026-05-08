import AllAnnouncementServer from '@/components/section/AllSection/AnnouncementAll/AnnouncementAll.server';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default function AnnouncementsPage({ searchParams }: PageProps) {
  return <AllAnnouncementServer searchParams={searchParams} />;
}
