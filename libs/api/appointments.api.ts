import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import { AppointmentInterface } from '../interface/appointments.interface';

export async function getAppointments(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<AppointmentInterface>({
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
    search: params?.search,
    searchFields: [
      'title',
      'position',
      'appointee_name',
      'office_name',
    ], 
    ministry: params?.ministryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  return result;
}


export async function getAppointmentById(id: string) {
  const result = await baseQuery<AppointmentInterface>({
    table: model.appointments,
    select: `*, mdas(id,name,acronym,type)`,
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}