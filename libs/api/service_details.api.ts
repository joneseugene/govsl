import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { ServiceDetailsInterface } from "../interface/service/service.details.interface";

export async function getServiceDetails(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<ServiceDetailsInterface>({
    table: model.service_details,
    select: "*",
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}