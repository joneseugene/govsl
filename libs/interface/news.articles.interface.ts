import { AttachmentInterface } from "./attachments.interface";
import { MDAInterface } from "./mda/mdas.interface";

export interface NewsArticleInterface {
  id: string;
  title: string;
  headline?: string;
  summary?: string;
  content?: string;
  status?: string;
  category?: string;
  tags?: string[];
  date?: Date;
  location?: string;
  author?: string;
  ministry_address?: string;
  media_contact?: string;
  official_seal_url?: string;
  qr_code_url?: string;
  authorized_signature?: string;
  signatory_title_field?: string;
  ministry_id?: string;
  ministry?: Pick<MDAInterface, "id" | "name" | "contact"> | null;
  relatedLinks?: AttachmentInterface[];
}
