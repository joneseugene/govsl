import AppointmentSectionClient from './AppointmentSection.client';
import { getAppointmentSummary } from '@/libs/api/appointments.api';

export default async function AppointmentSectionServer() {
  const appointments = await getAppointmentSummary({
    limit: 5,
  });

  return <AppointmentSectionClient items={appointments.data} />;
}
