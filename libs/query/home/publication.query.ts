import { getPublications } from "@/libs/api/publications.api";

export const publicationQueryKey = ["home-publications"];

export async function getHomePublications() {
  return getPublications();
}