import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { ServicesInterface } from "../interface/service/services.interface";

export async function getServices(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<ServicesInterface>({
    table: model.services,
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

export async function getServiceById(id: string) {
  const result = await baseQuery<ServicesInterface>({
    table: model.services,
    select: "*",
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}