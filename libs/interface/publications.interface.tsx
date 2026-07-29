import { MDASummary } from './mda/mda.summary.interface';

export interface PublicationInterface {
  id: string;
  title: string;
  description?: string;
  content?: string;
  abstract?: string;
  executive_summary?: string;
  financial_overview?: string;
  legacy_id?: string;
  file_name?: string;
  file_url?: string;
  file_type?: string;
  file_size?: string;
  ministry_id?: string;
  reference_number?: string;
  pdf_url?: string;
  publish_date?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  authors?: string;
  category?: string;
  language?: string;
  pages?: number;
  isbn?: string;
  type?: string;
  mdas?: MDASummary | null;
}
