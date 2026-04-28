import { AttachmentInterface } from "./attachments.interface";
import { MDAInterface } from "./mda/mdas.interface";

export interface AnnouncementInterface {
  id: string;
  announcement_type: string;
  title?: string;
  description?: string;
  content?: string;
  status?: string;
  date?: Date;
  deadline?: Date;
  location?: string;
  attachment?: AttachmentInterface[];
  job_title?: string;
  employment_type?: string;
  job_summary?: string;
  key_responsibilities?: string;
  education_experience?: string;
  skills?: string;
  how_to_apply?: string;
  contact_email?: string;
  contact_phone?: string;
  event_date?: Date;
  event_time?: string;
  end_date?: Date;
  end_time?: string;
  event_type?: string;
  notice_type?: string;
  expiry_date?: string;
  contact_info?: string;
  ministry_id?: string;
  ministry?: Pick<MDAInterface, "id" | "name" | "contact"> | null;
}
