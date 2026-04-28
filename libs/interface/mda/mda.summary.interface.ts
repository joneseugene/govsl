import { MDAInterface } from './mdas.interface';

export type MDASummary = Pick<MDAInterface, 'id' | 'name' | 'acronym' | 'contact'>;
