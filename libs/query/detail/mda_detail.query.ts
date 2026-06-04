import { getMDAById, getMdas } from '@/libs/api/mdas.api';

export const mdaDetailQueryKey = (id: string) => ['mda-detail', id];

export const relatedMdaQueryKey = (id: string) => ['related-mdas', id];

export async function getMdaDetail(id: string) {
  return getMDAById(id);
}

export async function getRelatedMdas(id: string) {
  const allMdas = await getMdas({
    status: 'active',
    limit: 100,
  });

  return allMdas.filter((item) => item.parent_ministry_id === id);
}
