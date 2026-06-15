import AppointmentSectionClient from './AppointmentSection.client';
import { toPlain } from '@/libs/functions';
import { getHomeAppointments } from '@/libs/query/home/appointment.query';

export const revalidate = 120;

export default async function AppointmentSectionServer() {
  const data = await getHomeAppointments();

  return <AppointmentSectionClient initialData={toPlain(data)} />;
}