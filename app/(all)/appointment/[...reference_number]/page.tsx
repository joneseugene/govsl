import { notFound } from 'next/navigation';
import { AppointmentDetail } from '@/components/section/DetailSection/Appointment/AppointmentDetail';
import { getAppointmentsByReferenceNumber } from '@/libs/api/appointments.api';

interface Props {
  params: Promise<{
    reference_number: string[];
  }>;
}

export default async function Page({ params }: Props) {
  const { reference_number } = await params;
  const decodedReferenceNumber = reference_number.join('/');
  const notices = await getAppointmentsByReferenceNumber(decodedReferenceNumber);
  if (!notices || notices.length === 0) {
    notFound();
  }

  return <AppointmentDetail notices={notices} />;
}