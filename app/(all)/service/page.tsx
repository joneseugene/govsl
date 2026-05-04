import AllServicesServer from "@/components/section/AllSection/ServiceAll/ServiceAll.server";

export default function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}) {
  return <AllServicesServer searchParams={searchParams} />;
}