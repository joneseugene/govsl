import { getAppointments } from "@/libs/api/appointments.api";
import { getMDAOptions } from "@/libs/api/mdas.api";

export type AppointmentAllParams = {
  page: number;
  search?: string;
  ministryId?: string;
  category?: string;
};

export const appointmentAllQueryKey = (params: AppointmentAllParams) => [
  "all-appointments",
  params.page,
  params.search ?? "",
  params.ministryId ?? "all",
  params.category ?? "all",
];

export const appointmentMdaOptionsQueryKey = ["appointment-mda-options"];

export async function getAllAppointments(params: AppointmentAllParams) {
  return getAppointments({
    page: params.page,
    type: "notice",
    limit: 10,
    search: params.search,
    ministryId: params.ministryId,
  });
}

export async function getAppointmentMdaOptions() {
  return getMDAOptions();
}