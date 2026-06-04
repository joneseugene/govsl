import { getAnnouncements } from "@/libs/api/announcements.api";
import { getMDAOptions } from "@/libs/api/mdas.api";

export type AnnouncementAllParams = {
  page: number;
  search?: string;
  ministryId?: string;
  category?: string;
};

export const announcementAllQueryKey = (params: AnnouncementAllParams) => [
  "all-announcements",
  params.page,
  params.search ?? "",
  params.ministryId ?? "all",
  params.category ?? "all",
];

export const announcementMdaOptionsQueryKey = ["announcement-mda-options"];

export async function getAllAnnouncements(params: AnnouncementAllParams) {
  return getAnnouncements({
    page: params.page,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
    category: params.category,
  });
}

export async function getAnnouncementMdaOptions() {
  return getMDAOptions();
}