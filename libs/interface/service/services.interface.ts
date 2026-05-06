import { MDASummary } from '../mda/mda.summary.interface';
import {
  RelatedServices,
  ServiceApplicationSteps,
  ServiceDocuments,
  ServiceFAQs,
  ServiceFees,
  ServiceLocations,
} from './service.helpers';

export interface ServicesInterface {
  id?: string;
  name?: string;
  category?: string;
  page?: string;
  category_page?: string;
  description?: string;
  processing_time?: string;
  price?: string;
  service_provider?: string;
  availability?: string;
  online_application_url?: string;
  verified?: boolean;
  ministry_id?: string;
  mdas?: MDASummary | null;
  who_can_apply?: [];
  eligibility_requirements?: [];
  documents_required?: ServiceDocuments[];
  application_steps?: ServiceApplicationSteps[];
  fees?: ServiceFees[];
  locations?: ServiceLocations[];
  faqs?: ServiceFAQs[];
  related_services?: RelatedServices[];
  important_notes?: [];
  has_detail_page?: boolean;
  updated_at?: boolean;
  active?: boolean;
}
