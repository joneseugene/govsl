import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import {
  AppointmentInterface,
  AppointmentSummaryInterface,
} from '../interface/appointments.interface';

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
    searchFields: ['title', 'position', 'appointee_name', 'office_name'],
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

export async function getAppointmentSummary(params?: {
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
  category?: string;
}) {
  const result = await baseQuery<AppointmentSummaryInterface>({
    table: 'appointment_summary_view',

    select: '*',

    search: params?.search,

    searchFields: [
      'summary_text',
      'appointee_names',
      'positions',
      'reference_numbers',
      'ministry_name',
    ],

    filters: {
      ministry_id: params?.ministryId,
      category: params?.category,
    },

    page: params?.page ?? 1,
    limit: params?.limit ?? 10,
  });

  return result;
}

export async function getAppointmentsByDate(date: string) {
  const result = await baseQuery<AppointmentInterface>({
    table: model.appointments,
    select: `*, mdas(id,name,acronym,type)`,
    filters: {
      appointment_date: date,
    },
    page: 1,
    limit: 100,
  });

  return result.data;
}
