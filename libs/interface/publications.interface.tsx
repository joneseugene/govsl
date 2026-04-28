import { MDAInterface } from "./mda/mdas.interface";

export interface PublicationInterface {
    id: string;
    title?: string;
    description?: string;
    content?: string;
    file_url?: string;
    status: string;
    date?: Date;
    ministry_id?: string;
    ministry?: Pick<MDAInterface, "id" | "name" | "contact"> | null;
}