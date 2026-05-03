import { getPressReleases } from '@/libs/api/press.releases.api';
import PressReleasesAllClient from './PreaseReleaseAll.client';
import { getMDAOptions} from '@/libs/api/mdas.api';
import ErrorUI from '@/components/ui/ErrorUI';

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

  const result = await getPressReleases({
    status: 'approved',
    page: safePage,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
  });

  const ministries = await getMDAOptions();

  if (result.error) {
    return (
      <ErrorUI
        title="Failed to load press releases"
        message={result.error || 'Something went wrong'}
        retryPath="/press-release"
      />
    );
  }

  return (
    <PressReleasesAllClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={params.search}
      ministryId={params.ministryId}
      ministries={ministries}
    />
  );
}
