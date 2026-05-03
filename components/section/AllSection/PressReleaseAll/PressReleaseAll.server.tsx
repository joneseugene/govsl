import { getPressReleases } from '@/libs/api/press.releases.api';
import PressReleasesAllClient from './PreaseReleaseAll.client';
import { getAllMDAs } from '@/libs/api/mdas.api';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function AllPressReleasesSectionServer({
  searchParams,
}: {
  searchParams?: SearchParams; // ✅ NOT a Promise
}) {
  const params = searchParams ?? {};

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const { data, total } = await getPressReleases({
    status: 'approved',
    page: safePage,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
  });

  const ministries = await getAllMDAs();

  return (
    <PressReleasesAllClient
      items={data}
      total={total ?? 0}
      currentPage={safePage}
      search={params.search}
      ministryId={params.ministryId}
      ministries={ministries}
    />
  );
}
