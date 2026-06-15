import AllServicesClient from "./ServiceAll.client";
import { getAllServiceCategories } from "@/libs/query/all/service_all.query";

export const revalidate = 120;

type SearchParams = {
  page?: string;
  search?: string;
  category?: string;
  from?: string;
};

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function AllServicesServer({ searchParams }: Props) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params?.page ?? 1) || 1);
  const search = params?.search?.trim() || "";

  const result = await getAllServiceCategories();

  return (
    <AllServicesClient
      currentPage={safePage}
      search={search}
      category={params?.category ?? "all"}
      services={result.data ?? []}
    />
  );
}