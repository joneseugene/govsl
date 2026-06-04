import { getAppointments } from "@/libs/api/appointments.api";

export const appointmentQueryKey = [
  "home-appointments",
  "notice",
  5,
];

export async function getHomeAppointments() {
  return getAppointments({
    type: "notice",
    limit: 5,
  });
}