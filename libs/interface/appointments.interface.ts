import { MDASummary } from './mda/mda.summary.interface';

export interface AppointmentInterface {
  id: string;
  type?: string;
  title?: string;
  description?: string;
  reference_number?: string;
  office_name?: string;
  office_address?: string[];
  signatory_name?: string;
  appointment_date?: string;
  signatory_title?: string;
  copy_to?: string[];
  status?: string;
  notice_intro?: string;
  linked_letter_ids?: string[];
  linked_letters?: AppointeeDetailInterface[];
  mdas?: MDASummary;
}

export interface AppointeeDetailInterface {
  id: string;
  type?: string;
  reference_number?: string;
  appointee_name?: string;
  appointment_date?: string;
  position?: string;
  office_name?: string;
}
