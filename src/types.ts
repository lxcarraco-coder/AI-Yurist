export type UserRole = 'tadbirkor' | 'buxgalter' | 'fuqaro';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  userRole?: UserRole;
}

export interface LegalIndicator {
  id: string;
  name: string;
  shortName: string;
  value: string;
  effectiveDate: string;
  basis: string;
  description: string;
}

export interface LegalCode {
  id: string;
  title: string;
  adoptedYear: string;
  articlesCount: number;
  lexUrl: string;
  badge: string;
  summary: string;
  keyArticles: {
    number: string;
    topic: string;
    description: string;
  }[];
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: 'mehnat' | 'korxona' | 'shartnoma' | 'sud' | 'fuqarolik';
  categoryLabel: string;
  description: string;
  legalBasis: string;
  templateText: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
  }[];
}

export interface SavedLegalDocument {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
}

export interface UserProfile {
  telegramId: number | string;
  phone: string;
  fullName: string;
  username?: string;
  role: UserRole;
  plan: 'free' | 'standard' | 'professional';
  balance: number;
  consultationsCount: number;
  documentsCount: number;
  isRegistered?: boolean;
  createdAt?: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'standard' | 'professional';
  name: string;
  price: number;
  currency: string;
  period: string;
  badge: string;
  features: string[];
  isCurrent?: boolean;
  paymentReady?: boolean;
}
