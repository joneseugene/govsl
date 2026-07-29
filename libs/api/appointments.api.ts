import { model } from '@/supabase/model';
import { baseQuery } from './base.api';
import {
  AppointeeDetailInterface,
  AppointmentInterface,
} from '../interface/appointments.interface';
import { createServerSupabaseClient } from '@/supabase/server';

export async function getAppointments(params?: {
  status?: string;
  type?: string;
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
      type: params?.type,
      mda_id: params?.ministryId,
    },
    search: params?.search,
    searchFields: ['title', 'position', 'reference_number', 'appointee_name', 'office_name'],
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
    orderBy: 'created_at',
    ascending: false,
  });

  return result;
}

export async function getAppointmentsByReferenceNumber(
  reference_number: string,
): Promise<AppointmentInterface[]> {
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
      reference_number,
      type: 'notice',
    },
    limit: 100,
    page: 1,
  });

  const notices = result.data ?? [];

  if (notices.length === 0) {
    return [];
  }

  const linkedIds = [
    ...new Set(notices.flatMap((notice) => notice.linked_letter_ids ?? []).filter(Boolean)),
  ];

  if (linkedIds.length === 0) {
    return notices.map((notice) => ({
      ...notice,
      linked_letters: [],
    }));
  }

  const supabase = await createServerSupabaseClient();

  const { data: letters, error } = await supabase
    .from(model.appointments)
    .select(
      `
      id,
      type,
      reference_number,
      appointee_name,
      appointment_date,
      position,
      office_name
    `,
    )
    .in('id', linkedIds)
    .eq('type', 'letter');

  if (error) {
    throw new Error(error.message);
  }

  const linkedLetters = (letters ?? []) as AppointeeDetailInterface[];

  return notices.map((notice) => {
    const noticeLinkedIds = notice.linked_letter_ids ?? [];

    return {
      ...notice,
      linked_letters: linkedLetters.filter((letter) => noticeLinkedIds.includes(letter.id)),
    };
  });
}
