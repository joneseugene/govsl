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
  category?: 'executive' | 'ministerial' | 'board' | 'diplomatic' | null;
  mdas?: MDASummary;
  status?: string;
}
