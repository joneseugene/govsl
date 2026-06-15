import AppointmentSectionClient from './AppointmentSection.client';
import { getQueryClient, toPlain } from '@/libs/functions';
import { appointmentQueryKey, getHomeAppointments } from '@/libs/query/home/appointment.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AppointmentSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: appointmentQueryKey,
    queryFn: async () => {
      const data = await getHomeAppointments();
      return toPlain(data);
    },
  });

  return (
    <HydrationBoundary state={toPlain(dehydrate(queryClient))}>
      <AppointmentSectionClient />
    </HydrationBoundary>
  );
}
