export interface Suggestion {
  id: string;
  title: string;
  name?: string;
  type: 'news' | 'press_release' | 'announcement' | 'publication' | 'appointment' | 'mda';

  acronym?: string;
  ministry?: string;
  link: string;

  summary?: string;
  created_at?: string;
}
