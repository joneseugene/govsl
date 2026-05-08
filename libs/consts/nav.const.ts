// Header
export const homeNavLinks = [
  { label: 'Press Releases', id: 'press-release', key: 'press-release' },
  { label: 'Appointments', id: 'appointment', key: 'appointment' },
  { label: 'News', id: 'news', key: 'news' },
  { label: 'Publications', id: 'publication', key: 'publication' },
  { label: 'Services', id: 'service', key: 'service' },
  { label: 'More', id: 'announcement', key: 'announcement' },
  { label: 'MDAs', id: 'mda', key: 'mda' },
];

// Footer
export const footerNavLinks = [
  { label: 'About GOV.SL', page: 'about' },
  { label: 'Contact Us', page: 'contact' },
  { label: 'Help & Support', page: 'help' },
  { label: 'Accessibility', page: 'accessibility' },
  { label: 'Privacy Policy', page: 'privacy' },
  { label: 'Terms & Conditions', page: 'terms' },
  { label: 'Transparency Dashboard', page: 'transparency' },
  { label: 'Open Government Licence', page: 'licence' },
];

// Logos
export const LOGO = {
  coatOfArms: {
    src: '/Coat_of_arms_of_Sierra_Leone.svg',
    alt: 'Government of Sierra Leone Coat of Arms',
    width: 120,
    height: 48,
  },
  flag: {
    src: '/sierra-leone-flag.svg',
    alt: 'Flag of Sierra Leone',
    width: 72,
    height: 48,
  },
} as const;
