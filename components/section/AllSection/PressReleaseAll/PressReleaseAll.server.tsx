import {
  getAllPressReleases,
  getPressReleaseMdaOptions,
} from "@/libs/query/all/press_release_all.query";

import PressReleasesAllClient from "./PreaseReleaseAll.client";

export const revalidate = 120;

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
  from?: string;
};

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function AllPressReleasesSectionServer({
  searchParams,
}: Props) {
  const params = await searchParams;

  const safePage = Number(params?.page) > 0 ? Number(params?.page) : 1;
  const search = params?.search ?? "";
  const ministryId = params?.ministryId ?? "all";

  const queryParams = {
    page: safePage,
    search: search.trim() || undefined,
    ministryId: ministryId !== "all" ? ministryId : undefined,
  };

  const [result, ministries] = await Promise.all([
    getAllPressReleases(queryParams),
    getPressReleaseMdaOptions(),
  ]);

  return (
    <PressReleasesAllClient
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      releases={result.data ?? []}
      total={result.total ?? 0}
      ministries={ministries ?? []}
    />
  );
}