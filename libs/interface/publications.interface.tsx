import { MDASummary } from './mda/mda.summary.interface';

export interface PublicationInterface {
  id: string;
  title: string;
  description?: string;
  content?: string;
  file_name?: string;
  file_url?: string;
  file_type?: string;
  file_size?: string;
  status: string;
  date?: string;
  ministry_id?: string;
  reference_number?: string;
  pdf_url?: string;
  mdas?: MDASummary | null;
}
