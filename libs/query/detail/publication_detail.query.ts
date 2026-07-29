import { getPublicationById } from "@/libs/api/publications.api";

export const publicationDetailQueryKey = (id: string) => [
  "publication-detail",
  id,
];

export async function getPublicationDetail(id: string) {
  const publication = await getPublicationById(id);
  return publication;
}