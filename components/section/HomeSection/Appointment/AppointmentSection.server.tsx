import AppointmentSectionClient from './AppointmentSection.client';
import { getQueryClient } from '@/libs/functions';
import { appointmentQueryKey, getHomeAppointments } from '@/libs/query/home/appointment.query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AppointmentSectionServer() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: appointmentQueryKey,
    queryFn: getHomeAppointments,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentSectionClient />
    </HydrationBoundary>
  );
}