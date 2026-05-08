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
  const result = await baseQuery<AnnouncementTypeInterface>({
    table: 'announcement_types_view',
    select: '*',
    page: 1,
    limit: 100,
  });

  const mapped: AnnouncementTypeMappedInterface[] = result.data
    .map((item) => {
      const type = item.announcement_type?.toLowerCase().trim() || '';

      const config = announcementTypeMap[type];

      // Ignore unsupported types
      if (!config) {
        return null;
      }

      return {
        ...item,
        title: config.title,
        description: config.description,
        route: config.route,
      };
    })
    .filter((item): item is AnnouncementTypeMappedInterface => item !== null);

  return mapped;
}
