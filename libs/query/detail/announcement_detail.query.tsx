import { getAnnouncementById } from "@/libs/api/announcements.api";

export const announcementDetailQueryKey = (id: string) => [
  "announcement-detail",
  id,
];

export async function getAnnouncementDetail(id: string) {
  return getAnnouncementById(id);
}