import { getServiceById } from '@/libs/api/services.api';

export const serviceDetailQueryKey = (id: string) => ['service-detail', id];

export async function getServiceDetail(id: string) {
  return getServiceById(id);
}
