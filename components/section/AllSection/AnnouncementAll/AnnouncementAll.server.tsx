// AnnouncementAll.server.tsx

import { getMDAOptions } from '@/libs/api/mdas.api';
import AllAnnouncementClient from './AnnouncementAll.client';
import { getAnnouncements } from '@/libs/api/announcements.api';

type SearchParams = {
  page?: string;
  search?: string;
  ministry?: string;
  category?: string;
};

export default async function AllAnnouncementServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const search = params.search?.trim() || undefined;

  const ministryId = params.ministry && params.ministry !== 'all' ? params.ministry : undefined;

  const category = params.category && params.category !== 'all' ? params.category : undefined;

  const [result, ministries] = await Promise.all([
    getAnnouncements({
      page: safePage,
      limit: 5,
      search,
      ministryId,
      category,
    }),

    getMDAOptions(),
  ]);

  return (
    <AllAnnouncementClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={params.ministry ?? 'all'}
      category={params.category ?? 'all'}
      ministries={ministries}
    />
  );
}
