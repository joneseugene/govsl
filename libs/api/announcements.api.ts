import { model } from "@/supabase/model";
import { AnnouncementInterface } from "../interface/announcements.interface";
import { baseQuery } from "./base.api";


export async function getAnnouncements(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: "*",
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}