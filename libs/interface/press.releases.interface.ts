import { AttachmentInterface } from './attachments.interface';
import { MDASummary } from './mda/mda.summary.interface';

export interface PressReleaseInterface {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  location?: string;
  contact_info?: string;
  attachments?: AttachmentInterface[];
  status?: string;
  ministry_id?: string;
  mdas?: MDASummary | null;
  date?: string;
}
