import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import PublicationDetailClient from "@/components/section/DetailSection/Publication/PublicationDetail";

import { getQueryClient } from "@/libs/functions";

import {
  getPublicationDetail,
  publicationDetailQueryKey,
} from "@/libs/query/detail/publication_detail.query";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: publicationDetailQueryKey(id),
    queryFn: () => getPublicationDetail(id),
  });

  const publication = queryClient.getQueryData(
    publicationDetailQueryKey(id)
  ) as Awaited<ReturnType<typeof getPublicationDetail>>;

  if (!publication) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicationDetailClient id={id} />
    </HydrationBoundary>
  );
}