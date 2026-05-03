import { model } from "@/supabase/model";
import { AnnouncementInterface } from "../interface/announcements.interface";
import { baseQuery } from "./base.api";

export async function getAnnouncements(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: "*",
    filters: {
      status: params?.status,
    },
    search: params?.search,
    ministry: params?.ministryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  return result;
}

export async function getAnnouncementById(id: string) {
  const result = await baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: "*",
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}