import { getPressReleases } from '@/libs/api/press.releases.api';
import PressReleasesAllClient from './PreaseReleaseAll.client';

export default async function AllPressReleasesSectionServer({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const safePage = Math.max(1, Number(searchParams?.page ?? 1) || 1);

  const { data, total } = await getPressReleases({
    status: 'approved',
    page: safePage,
    limit: 5,
  });

  // ✅ DEBUG LOGS (server-side)
  console.log('===== PRESS RELEASE PAGINATION DEBUG =====');
  console.log('Requested page:', safePage);
  console.log('Items returned:', data.length);
  console.log('Total items in DB:', total);
  console.log('Pages (calculated):', Math.ceil((total ?? 0) / 5));
  console.log(
    'IDs on this page:',
    data.map((d) => d.id),
  );
  console.log('==========================================');

  return <PressReleasesAllClient items={data} total={total ?? 0} currentPage={safePage} />;
}
