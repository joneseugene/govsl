import { MDASummary } from './mda/mda.summary.interface';

export interface AppointmentInterface {
  id: string;
  title?: string;
  position?: string;
  appointee_name?: string;
  appointment_date?: string;
  description?: string;
  reference_number?: string;
  office_name?: string;
  office_address?: string[];
  recipient_address?: string;
  content?: string;
  signatory_name?: string;
  signatory_title?: string;
  copy_to?: string[];
  ministry_id?: string;
  mdas?: MDASummary;
  status?: string;
}

export interface AppointmentSummaryInterface {
  id: string;
  appointment_date: string;
  signatory_name?: string;
  signatory_title?: string;
  total_appointments: number;
  summary_text: string;
  appointee_names?: string;
  positions?: string;
  reference_number?: string;
  ministry_name?: string;
  ministry_id?: string;
  category?: string;
}
