import { getMDAById, getMdas } from '@/libs/api/mdas.api';

export const mdaDetailQueryKey = (id: string) => ['mda-detail', id];

export const relatedMdaQueryKey = (id: string) => ['related-mdas', id];

export async function getMdaDetail(id: string) {
  return getMDAById(id);
}

export async function getRelatedMdas(id: string) {
  const result = await getMdas({
    status: 'active',
    page: 1,
    limit: 1000,
  });

  return result.data.filter((item) => item.parent_ministry_id === id);
}
