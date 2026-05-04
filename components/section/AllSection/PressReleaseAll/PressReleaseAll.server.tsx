import { getPressReleases } from '@/libs/api/press.releases.api';
import PressReleasesAllClient from './PreaseReleaseAll.client';
import { getMDAOptions } from '@/libs/api/mdas.api';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function AllPressReleasesSectionServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministryId && params.ministryId !== 'all' ? params.ministryId : undefined;

  const result = await getPressReleases({
    status: 'approved',
    page: safePage,
    limit: 5,
    search,
    ministryId,
  });

  const ministries = await getMDAOptions();

  return (
    <PressReleasesAllClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      ministries={ministries}
    />
  );
}
