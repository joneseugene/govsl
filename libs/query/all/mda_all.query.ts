import { getMdas } from "@/libs/api/mdas.api";

export type MdaAllParams = {
  page: number;
  search?: string;
};

export async function getAllMdas(params: MdaAllParams) {
  return getMdas({
    status: 'active',
    page: params.page,
    limit: 10,
    search: params.search,
  });
}