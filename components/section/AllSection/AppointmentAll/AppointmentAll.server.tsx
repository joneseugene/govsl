import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AppointmentAllClient from './AppointmentAll.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import {
  appointmentAllQueryKey,
  appointmentMdaOptionsQueryKey,
  getAllAppointments,
  getAppointmentMdaOptions,
} from '@/libs/query/all/appointment_all.query';

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

  const queryParams = {
    page: safePage,
    search,
    ministryId,
  };

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: appointmentAllQueryKey(queryParams),
      queryFn: async () => {
        const data = await getAllAppointments(queryParams);
        return toPlain(data);
      },
    }),

    queryClient.prefetchQuery({
      queryKey: appointmentMdaOptionsQueryKey,
      queryFn: async () => {
        const data = await getAppointmentMdaOptions();
        return toPlain(data);
      },
    }),
  ]);

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <AppointmentAllClient
        currentPage={safePage}
        search={search}
        ministryId={params.ministryId ?? 'all'}
        category={params.category ?? 'all'}
      />
    </HydrationBoundary>
  );
}
