import { getMdas } from '@/libs/api/mdas.api';

export type MdaAllParams = {
  search?: string;
};

export const mdaAllQueryKey = (params: MdaAllParams) => ['all-mdas', params.search ?? ''];

export async function getAllMdas(params: MdaAllParams) {
  return getMdas({
    status: 'active',
    search: params.search,
    limit: 300,
  });
}
