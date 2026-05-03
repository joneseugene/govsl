import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { ServiceDetailsInterface } from "../interface/service/service.details.interface";

export async function getServiceDetails(params?: {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  ministryId?: string;
}) {
  const result = await baseQuery<ServiceDetailsInterface>({
    table: model.service_details,
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

export async function getServiceDetailById(id: string) {
  const result = await baseQuery<ServiceDetailsInterface>({
    table: model.service_details,
    select: "*",
    filters: { id },
    limit: 1,
    page: 1,
  });

  return result.data[0] ?? null;
}