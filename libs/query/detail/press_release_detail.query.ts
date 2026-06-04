import { getPressReleaseById } from "@/libs/api/press.releases.api";

export const pressReleaseDetailQueryKey = (id: string) => [
  "press-release-detail",
  id,
];

export async function getPressReleaseDetail(id: string) {
  return getPressReleaseById(id);
}