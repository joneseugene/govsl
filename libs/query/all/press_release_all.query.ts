import { getPressReleases } from "@/libs/api/press.releases.api";
import { getMDAOptions } from "@/libs/api/mdas.api";

export type PressReleaseAllParams = {
  page: number;
  search?: string;
  ministryId?: string;
};

export const pressReleaseAllQueryKey = (params: PressReleaseAllParams) => [
  "all-press-releases",
  params.page,
  params.search ?? "",
  params.ministryId ?? "all",
];

export const pressReleaseMdaOptionsQueryKey = [
  "press-release-mda-options",
];

export async function getAllPressReleases(params: PressReleaseAllParams) {
  return getPressReleases({
    status: "approved",
    page: params.page,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
  });
}

export async function getPressReleaseMdaOptions() {
  return getMDAOptions();
}