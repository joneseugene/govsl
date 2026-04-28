import { AttachmentInterface } from './attachments.interface';
import { MDASummary } from './mda/mda.summary.interface';

export interface NewsArticleInterface {
  id: string;
  title: string;
  headline?: string;
  summary?: string;
  content?: string;
  status?: string;
  category?: string;
  tags?: string[];
  date?: string;
  location?: string;
  author?: string;
  ministry_address?: string;
  media_contact?: string;
  official_seal_url?: string;
  qr_code_url?: string;
  authorized_signature?: string;
  signatory_title_field?: string;
  ministry_id?: string;
  mdas?: MDASummary | null;
  relatedLinks?: AttachmentInterface[];
}
