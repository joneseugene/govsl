import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PressReleaseDetailUI } from "@/components/section/DetailSection/PressRelease/PressReleaseDetail";
import { getQueryClient } from "@/libs/functions";
import {
  getPressReleaseDetail,
  pressReleaseDetailQueryKey,
} from "@/libs/query/detail/press_release_detail.query";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PressReleasePage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pressReleaseDetailQueryKey(id),
    queryFn: () => getPressReleaseDetail(id),
  });

  const pressRelease = queryClient.getQueryData(
    pressReleaseDetailQueryKey(id)
  ) as Awaited<ReturnType<typeof getPressReleaseDetail>>;

  if (!pressRelease) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PressReleaseDetailUI id={id} />
    </HydrationBoundary>
  );
}