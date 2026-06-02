import { MDAContact } from './mda.contact.interface';
import { MDASummary } from './mda.summary.interface';
import { Minister } from './minister.interface';

export interface MDAInterface {
  id: string;
  name: string;
  acronym?: string;
  type?: string;
  status?: string;
  mandate?: string;

  minister?: Minister | null;
  deputy_minister?: Minister | null;

  vision?: string;
  mission?: string;

  contact?: MDAContact | null;

  parent_ministry_id?: string | null;
  parent_ministry?: MDASummary | null;
}
