import AllAnnouncementClient from "./AnnouncementAll.client";
import {
  getAllAnnouncements,
  getAnnouncementMdaOptions,
} from "@/libs/query/all/announcement_all.query";

export const revalidate = 120;

type SearchParams = {
  page?: string;
  search?: string;
  ministryId?: string;
  category?: string;
  from?: string;
};

type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function AllAnnouncementServer({
  searchParams,
}: Props) {
  const params = await searchParams;

  const safePage = Math.max(1, Number(params?.page ?? 1) || 1);
  const search = params?.search?.trim() || "";

  const ministryId = params?.ministryId ?? "all";
  const category = params?.category ?? "all";

  const queryParams = {
    page: safePage,
    search: search || undefined,
    ministryId: ministryId !== "all" ? ministryId : undefined,
    category: category !== "all" ? category : undefined,
  };

  const [result, ministries] = await Promise.all([
    getAllAnnouncements(queryParams),
    getAnnouncementMdaOptions(),
  ]);

  return (
    <AllAnnouncementClient
      currentPage={safePage}
      search={search}
      ministryId={ministryId}
      category={category}
      announcements={result.data ?? []}
      total={result.total ?? 0}
      ministries={ministries ?? []}
    />
  );
}