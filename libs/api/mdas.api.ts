import { model } from "@/supabase/model";
import { NewsArticleInterface } from "../interface/news.articles.interface";
import { baseQuery } from "./base.api";
import { MDAInterface } from "../interface/mda/mdas.interface";

export async function getMdas(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<MDAInterface>({
    table: model.mdas,
    select: "*",
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}