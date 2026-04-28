import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { ServicesInterface } from "../interface/service/services.interface";

export async function getServices(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<ServicesInterface>({
    table: model.services,
    select: "*",
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}