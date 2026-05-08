import { notFound } from 'next/navigation';
import { getAppointmentsByDate } from '@/libs/api/appointments.api';
import { AppointmentDetail } from '@/components/section/DetailSection/Appointment/AppointmentDetail';

interface Props {
  params: Promise<{
    date: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { date } = await params;

  if (!date) {
    notFound();
  }

  const notices = await getAppointmentsByDate(date);

  if (!notices || notices.length === 0) {
    notFound();
  }

  return <AppointmentDetail date={date} notices={notices} />;
}
