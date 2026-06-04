import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AppointmentDetail } from "@/components/section/DetailSection/Appointment/AppointmentDetail";
import { getQueryClient } from "@/libs/functions";
import { appointmentDetailQueryKey, getAppointmentDetail } from "@/libs/query/detail/appointment_detail.query";

interface Props {
  params: Promise<{
    reference_number: string[];
  }>;
}

export default async function Page({ params }: Props) {
  const { reference_number } = await params;

  const decodedReferenceNumber = reference_number.join("/");

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: appointmentDetailQueryKey(decodedReferenceNumber),
    queryFn: () => getAppointmentDetail(decodedReferenceNumber),
  });

  const notices = queryClient.getQueryData(
    appointmentDetailQueryKey(decodedReferenceNumber)
  ) as Awaited<ReturnType<typeof getAppointmentDetail>>;

  if (!notices || notices.length === 0) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppointmentDetail referenceNumber={decodedReferenceNumber} />
    </HydrationBoundary>
  );
}