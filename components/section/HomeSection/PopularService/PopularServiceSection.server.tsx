import { getServiceDetails } from '@/libs/api/service_details.api';
import PopularServicesSectionClient from './PopularServiceSection.client';

export default async function PopularServicesSectionServer() {
  const service_details = await getServiceDetails();

  return <PopularServicesSectionClient items={service_details.data} />;
}
