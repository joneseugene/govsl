import { AttachmentInterface } from './attachments.interface';
import { MDASummary } from './mda/mda.summary.interface';
import { MDAInterface } from './mda/mdas.interface';

export interface AnnouncementInterface {
  id: string;
  reference_number?: string;
  announcement_type: string;
  category?: string;
  title?: string;
  description?: string;
  content?: string;
  status?: string;
  date?: string;
  deadline?: Date;
  location?: string;
  attachments?: AttachmentInterface[];
  job_title?: string;
  employment_type?: string;
  job_summary?: string;
  key_responsibilities?: string;
  education_experience?: string;
  skills?: string;
  how_to_apply?: string;
  contact_email?: string;
  contact_phone?: string;
  event_date?: string;
  event_time?: string;
  end_date?: string;
  end_time?: string;
  event_type?: string;
  notice_type?: string;
  expiry_date?: string;
  contact_info?: string;
  ministry_id?: string;
  pdf_url?: string;
  mdas?: MDASummary | null;
}
