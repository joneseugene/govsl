export interface ServiceDocuments {
  category: string;
  items: string[];
}

export interface ServiceApplicationSteps {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFees {
  amount: string;
  description: string;
}

export interface ServiceLocations {
  name: string;
  email?: string;
  hours?: string;
  phone?: string;
  address?: string;
}

export interface ServiceFAQs {
  question: string;
  answer: string;
}

export interface RelatedServices {
  name: string;
  page: string;
}