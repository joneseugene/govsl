import ServiceDetailUI from "@/components/section/DetailSection/Service/ServiceDetail";
import { getServiceById } from "@/libs/api/services.api";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, id } = await params;

  const res = await getServiceById(id);

  if (!res?.id) {
    return notFound();
  }

  return <ServiceDetailUI service={res} slug={slug} />;
}