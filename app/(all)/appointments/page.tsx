import AppointmentAllServer from '@/components/section/AllSection/AppointmentAll/AppointmentAll.server';

export default function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}) {
  return <AppointmentAllServer searchParams={searchParams} />;
}
