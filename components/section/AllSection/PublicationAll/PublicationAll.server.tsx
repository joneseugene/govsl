import { getPublications } from "@/libs/api/publications.api";
import { getMDAOptions } from "@/libs/api/mdas.api";
import PublicationAllClient from "./PublicationAll.client";

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
};

export default async function PublicationAllServer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ALWAYS await first
  const params = await searchParams;

  const safePage = Math.max(1, Number(params.page ?? 1) || 1);

  const search = params.search?.trim() || undefined;

  const ministryId =
    params.ministryId && params.ministryId !== "all"
      ? params.ministryId
      : undefined;


  const [result, ministries] = await Promise.all([
    getPublications({
      page: safePage,
      limit: 5,
      search,
      ministryId,
      status: "published",
    }),
    getMDAOptions(),
  ]);

  return (
    <PublicationAllClient
      items={result.data}
      total={result.total ?? 0}
      currentPage={safePage}
      search={search}
      ministryId={params.ministryId ?? "all"}
      ministries={ministries}
    />
  );
}