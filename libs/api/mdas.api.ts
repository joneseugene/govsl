import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { MDAInterface } from "../interface/mda/mdas.interface";

export async function getMdas(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  const data = await baseQuery<MDAInterface>({
    table: model.mdas,
    select: "*",
    filters: {
      status: params?.status,
    },
    limit: 50,
  });

  // shuffle
  const shuffled = data.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, params?.limit ?? 5);
}