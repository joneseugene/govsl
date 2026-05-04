import { MDASummary } from './mda/mda.summary.interface';
import { MDAInterface } from './mda/mdas.interface';

export interface PublicationInterface {
  id: string;
  title: string;
  description?: string;
  content?: string;
  file_url?: string;
  status: string;
  date?: string;
  ministry_id?: string;
  mdas?: MDASummary | null;
}
