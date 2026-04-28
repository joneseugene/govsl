export const homeSections = {
  pressRelease: {
    id: "press-release",
    routes: {
      detail: (id: string | number) => `/press-release/${id}`,
      all: "/press-release"
    }
  },
  appointment: {
    id: "appointment",
    routes: {
      detail: (id: string | number) => `/appointment/${id}`,
      all: "/appointment"
    }
  },
  news: {
    id: "news",
    routes: {
      detail: (id: string | number) => `/news/${id}`,
      all: "/news"
    }
  },
  publication: {
    id: "publication",
    routes: {
      detail: (id: string | number) => `/publication/${id}`,
      all: "/publication"
    }
  },
  popularServices: {
    id: "popular-service",
    routes: {
      detail: (id: string | number) => `/popular-service/${id}`,
      all: "/popular-service"
    }
  },
  more: {
    id: "more",
    routes: {
      detail: (id: string | number) => `/more/${id}`,
      all: "/more"
    }
  },
  service: {
    id: "service",
    routes: {
      detail: (id: string | number) => `/service/${id}`,
      all: "/service"
    }
  },
  mda: {
    id: "mda",
    routes: {
      detail: (id: string | number) => `/mda/${id}`,
      all: "/mda"
    }
  }
} as const