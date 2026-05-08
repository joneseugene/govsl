// AppointmentAll.server.tsx

import AppointmentAllClient from './AppointmentAll.client';
import { getAppointmentSummary } from '@/libs/api/appointments.api';
import { getMDAOptions } from '@/libs/api/mdas.api';

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
  category?: string;
};

export default async function AppointmentAllServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministryId && params.ministryId !== 'all' ? params.ministryId : undefined;

  const category = params.category && params.category !== 'all' ? params.category : undefined;

  const result = await getAppointmentSummary({
    page: safePage,
    limit: 10,
    search,
    ministryId,
    category,
  });

  const ministries = await getMDAOptions();

  return (
    <AppointmentAllClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      category={category}
      ministries={ministries}
    />
  );
}
