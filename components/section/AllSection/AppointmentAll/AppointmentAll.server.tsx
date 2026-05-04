import AppointmentAllClient from './AppointmentAll.client';
import { getAppointments } from '@/libs/api/appointments.api';
import { getMDAOptions } from '@/libs/api/mdas.api';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function AppointmentAllServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  // Normalize search
  const search = params.search?.trim() || undefined;

  // Normalize ministry
  const ministryId =
    params.ministryId && params.ministryId !== 'all' ? params.ministryId : undefined;

  const result = await getAppointments({
    status: 'published',
    page: safePage,
    limit: 5,
    search,
    ministryId,
  });

  const ministries = await getMDAOptions();

  return (
    <AppointmentAllClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      ministries={ministries}
    />
  );
}
