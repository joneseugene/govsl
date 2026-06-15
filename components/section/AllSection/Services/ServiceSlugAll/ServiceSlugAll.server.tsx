import ServicesSlugClient from "./ServiceSlugAll.cllient";
import { getServiceCategoryBySlug } from "@/libs/query/all/service_all_slug.query";

export const revalidate = 120;

interface Props {
  categoryPage: string;
}

export default async function ServiceSlugServer({ categoryPage }: Props) {
  const result = await getServiceCategoryBySlug({
    categoryPage,
  });

  return (
    <ServicesSlugClient
      categoryPage={categoryPage}
      services={result?.data ?? []}
      meta={result?.meta ?? null}
    />
  );
}