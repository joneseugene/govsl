import { getPublications } from "@/libs/api/publications.api";
import { getMDAOptions } from "@/libs/api/mdas.api";

export type PublicationAllParams = {
  page: number;
  search?: string;
  ministryId?: string;
};

export const publicationAllQueryKey = (params: PublicationAllParams) => [
  "all-publications",
  params.page,
  params.search ?? "",
  params.ministryId ?? "all",
];

export const publicationMdaOptionsQueryKey = [
  "publication-mda-options",
];

export async function getAllPublications(params: PublicationAllParams) {
  const result = await getPublications({
    page: params.page,
    limit: 5,
    search: params.search,
    ministryId: params.ministryId,
    status: "approved",
  });
  return result;
}

export async function getPublicationMdaOptions() {
  return getMDAOptions();
}