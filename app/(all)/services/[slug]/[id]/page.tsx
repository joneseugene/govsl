import { notFound } from "next/navigation";
import ServiceDetailUI from "@/components/section/DetailSection/Service/ServiceDetail";
import { getServiceDetail } from "@/libs/query/detail/service_detail.query";

export const revalidate = 120;

interface Props {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, id } = await params;

  const service = await getServiceDetail(id);

  if (!service?.id) {
    notFound();
  }

  return <ServiceDetailUI slug={slug} service={service} />;
}