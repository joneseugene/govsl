import { getMdas } from '@/libs/api/mdas.api';

export const mdaQueryKey = ['home-mdas', 10];

export async function getHomeMdas() {
  return getMdas({ limit: 10 });
}
