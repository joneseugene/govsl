import { model } from '@/supabase/model';
import { AnnouncementInterface } from '../interface/announcements.interface';
import { baseQuery } from './base.api';
import { announcementTypeMap } from '../consts/general.const';


export async function getAnnouncements(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
  category?: string;
}) {
  const result = await baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: '*',
    filters: {
      status: params?.status,
      announcement_type: params?.category,
    },
    search: params?.search,
    searchFields: [
      'title',
      'description',
      'content',
      'announcement_type',
    ],
    ministry: params?.ministryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });

  return result;
}

export async function getAnnouncementById(id: string) {
  const result = await baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: '*',
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}

export interface AnnouncementTypeInterface {
  announcement_type: string;
  total: number;
}

export interface AnnouncementTypeMappedInterface extends AnnouncementTypeInterface {
  title: string;
  description: string;
  route: string;
}

export async function getAnnouncementTypes() {
  const result = await baseQuery<AnnouncementInterface>({
    table: model.announcements,
    select: "*",
    page: 1,
    limit: 100,
  });

  // Group announcements
  const grouped = result.data.reduce(
    (acc, item) => {
      const type = item.announcement_type?.toLowerCase().trim();

      // Ignore unsupported types
      if (!type || !announcementTypeMap[type]) {
        return acc;
      }

      // Create group if missing
      if (!acc[type]) {
        acc[type] = {
          announcement_type: type,
          total: 0,
          title: announcementTypeMap[type].title,
          description: announcementTypeMap[type].description,
          route: announcementTypeMap[type].route,

          // actual announcements
          data: [],
        };
      }

      acc[type].total += 1;

      // push announcement
      acc[type].data.push(item);

      return acc;
    },
    {} as Record<
      string,
      AnnouncementTypeMappedInterface & {
        data: AnnouncementInterface[];
      }
    >
  );

  return Object.values(grouped);
}
