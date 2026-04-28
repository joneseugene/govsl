// services/pressRelease.ts

import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { PressReleaseInterface } from "../interface/press.releases.interface";

export async function getPressReleases(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  return baseQuery<PressReleaseInterface>({
    table: model.press_releases,
    select: `
      *,
      mdas (
        id,
        name,
        acronym,
        type
      )
    `,
    filters: {
      status: params?.status,
    },
    page: params?.page ?? 1,
    limit: params?.limit ?? 5,
  });
}
