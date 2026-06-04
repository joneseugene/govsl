import { getLastUpdatedDate } from "@/libs/api/global.search.api";

export const heroLastUpdatedQueryKey = ["hero-last-updated"];

export async function getHeroLastUpdated() {
  return getLastUpdatedDate();
}