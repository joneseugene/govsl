import { Components } from 'react-markdown';


// Category Description
export const SERVICE_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'category-business':
    'Business registration, company incorporation, trade licenses, and commercial permits.',

  'category-agriculture': 'Agriculture, Fisheries & Natural Resources',

  'category-driving':
    'Apply for licenses, register vehicles, and manage transport-related services',

  'category-education': 'Education & Training',

  'category-employment': 'Employment & Labour',

  'category-energy': 'Energy, Water & Environment',

  'category-finance': 'Tax registration, filing, payment, customs duties, and revenue services.',

  'category-governance': 'Public Service & Governance',

  'category-health':
    'Health insurance, medical certificates, pharmacy licenses, and healthcare facility registration.',

  'category-identification':
    'Services for national identification, birth and death registration, marriage certificates, and other civil documentation.',

  'category-justice': 'Justice & Legal Affairs',

  'category-lands': 'Lands, Housing & Urban Planning',

  'category-security': 'Security & Public Safety',

  'category-technology': 'Technology, Communication & Innovation',

  'category-transport':
    "Driver's licenses, vehicle registration, road worthiness certificates, and road safety services.",

  'category-travel':
    'Passport services, visas, work permits, residence permits, and travel documentation for Sierra Leone',
};

// Announcement Types
export const announcementTypeMap: Record<
  string,
  {
    title: string;
    description: string;
    route: string;
  }
> = {
  vacancy: {
    title: 'Job Vacancies',
    description: 'Public sector employment opportunities',
    route: '/announcements/vacancy',
  },

  notice: {
    title: 'Public Notices & Tenders',
    description: 'Government procurement and official notices',
    route: '/announcements/notice',
  },

  event: {
    title: 'Government Events',
    description: 'Upcoming public events and ceremonies',
    route: '/announcements/event',
  },

  all: {
    title: 'All Announcements',
    description: 'Browse complete announcement archive',
    route: '/announcements',
  },
};
