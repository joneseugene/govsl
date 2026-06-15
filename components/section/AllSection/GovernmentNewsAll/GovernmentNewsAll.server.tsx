import AllGovernmentNewsClient from "./GovernmentNewsAll.client";
import {
  getAllGovernmentNews,
  getGovernmentNewsMdaOptions,
} from "@/libs/query/all/news_all.query";

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

export default async function AllGovernmentNewsServer({
  searchParams,
}: Props) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params?.page ?? 1) || 1);
  const search = params?.search?.trim() || "";

  const ministryId = params?.ministryId ?? "all";

  const queryParams = {
    page: safePage,
    search: search || undefined,
    ministryId: ministryId !== "all" ? ministryId : undefined,
  };

  const [result, ministries] = await Promise.all([
    getAllGovernmentNews(queryParams),
    getGovernmentNewsMdaOptions(),
  ]);

  return (
    <AllGovernmentNewsClient
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      newsItems={result.data ?? []}
      total={result.total ?? 0}
      ministries={ministries ?? []}
    />
  );
}