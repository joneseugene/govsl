import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { AppointmentInterface } from '../interface/appointments.interface';

export async function getAppointments(params?: { status?: string; page?: number; limit?: number }) {
  return baseQuery<AppointmentInterface>({
    table: model.appointments,
    select: `
      *,
      mdas (
        id,
        name,
        acronym,
        type
      )
    `,
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}
