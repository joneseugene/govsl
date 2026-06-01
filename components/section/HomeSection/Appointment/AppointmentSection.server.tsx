import { getAppointments } from '@/libs/api/appointments.api';
import AppointmentSectionClient from './AppointmentSection.client';

export default async function AppointmentSectionServer() {
  const appointments = await getAppointments({
    type: 'notice',
    limit: 5,
  });

  return <AppointmentSectionClient items={appointments.data ?? []} />;
}