import { getAppointmentsByReferenceNumber } from "@/libs/api/appointments.api";

export const appointmentDetailQueryKey = (referenceNumber: string) => [
  "appointment-detail",
  referenceNumber,
];

export async function getAppointmentDetail(referenceNumber: string) {
  return getAppointmentsByReferenceNumber(referenceNumber);
}