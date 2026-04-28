import { AttachmentInterface } from "./attachments.interface";
import { MDAInterface } from "./mda/mdas.interface";

//ALL
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
  ministry?: Pick<MDAInterface, "id" | "name" | "contact"> | null;
}
