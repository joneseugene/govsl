export const homeSections = {
  pressRelease: {
    id: 'press-release',
    routes: {
      detail: (id: string | number) => `/press-releases/${id}`,
      all: '/press-releases',
    },
  },
  appointment: {
    id: 'appointment',
    routes: {
      detail: (referenceNumber: string) => `/appointments/${referenceNumber}`,
      all: '/appointments',
    },
  },
  news: {
    id: 'news',
    routes: {
      detail: (id: string | number) => `/news/${id}`,
      all: '/news',
    },
  },
  publication: {
    id: 'publication',
    routes: {
      detail: (id: string | number) => `/publications/${id}`,
      all: '/publications',
    },
  },
  popularServices: {
    id: 'popular-service',
    routes: {
      detail: (id: string | number) => `/popular-services/${id}`,
      all: '/popular-services',
    },
  },
  service: {
    id: 'service',
    routes: {
      detail: (id: string | number) => `/services/${id}`,
      all: '/services',
    },
  },
  announcement: {
    id: 'announcement',
    routes: {
      detail: (id: string | number) => `/announcements/${id}`,
      all: '/announcements',
    },
  },
  mda: {
    id: 'mda',
    routes: {
      detail: (id: string | number) => `/mdas/${id}`,
      all: '/mdas',
    },
  },
} as const;
