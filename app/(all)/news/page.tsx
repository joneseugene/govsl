import AllGovernmentNewsServer from "@/components/section/AllSection/GovernmentNewsAll/GovernmentNewsAll.server";

export default function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    ministry?: string;
  }>;
}) {
  return <AllGovernmentNewsServer searchParams={searchParams} />;
}