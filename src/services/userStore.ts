import fs from 'fs';
import path from 'path';

export type UserPlan = 'free' | 'standard' | 'professional';
export const UserPlan = {};
export type RegistrationStep = 'WAITING_CONTACT' | 'WAITING_NAME' | 'COMPLETED';
export const RegistrationStep = {};

export interface SavedLegalDocument {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
}
export const SavedLegalDocument = {};

export interface UserProfile {
  telegramId: number | string;
  phone: string;
  fullName: string;
  username?: string;
  role: 'tadbirkor' | 'buxgalter' | 'fuqaro';
  plan: UserPlan;
  planExpiresAt?: string;
  balance: number; // in UZS
  consultationsCount: number;
  documentsCount: number;
  isRegistered: boolean;
  registrationStep: RegistrationStep;
  createdAt: string;
  savedDocuments: SavedLegalDocument[];
}
export const UserProfile = {};


// In-memory user store
const usersMap = new Map<string, UserProfile>();

// Seed a few demo or existing profiles so the system feels alive
const defaultAdmin: UserProfile = {
  telegramId: 'admin_preview',
  phone: '+998901234567',
  fullName: 'Tizim Foydalanuvchisi',
  username: 'yurist_user',
  role: 'fuqaro',
  plan: 'free',
  balance: 0,
  consultationsCount: 5,
  documentsCount: 2,
  isRegistered: true,
  registrationStep: 'COMPLETED',
  createdAt: new Date().toISOString(),
  savedDocuments: [
    {
      id: 'doc-1',
      title: 'Mehnat ta’tili arizasi (MK 217-modda)',
      type: 'mehnat',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      content: 'Bosh direktorga\nAriza\nMen ushbu orqali amaldagi Mehnat kodeksining 217-moddasiga asosan 21 kalendar kunlik yillik asosiy haq to‘lanadigan mehnat ta’tili berishingizni so‘rayman.',
    },
  ],
};
usersMap.set('admin_preview', defaultAdmin);

export function getUser(telegramId: number | string): UserProfile | undefined {
  const key = String(telegramId);
  return usersMap.get(key);
}

export function getUserByPhone(phone: string): UserProfile | undefined {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  for (const user of usersMap.values()) {
    if (user.phone.replace(/[^0-9]/g, '') === cleanPhone) {
      return user;
    }
  }
  return undefined;
}

export function createOrUpdateUser(
  telegramId: number | string,
  partial: Partial<UserProfile>
): UserProfile {
  const key = String(telegramId);
  const existing = usersMap.get(key);

  if (existing) {
    const updated: UserProfile = {
      ...existing,
      ...partial,
      savedDocuments: partial.savedDocuments || existing.savedDocuments,
    };
    usersMap.set(key, updated);
    return updated;
  }

  const newUser: UserProfile = {
    telegramId: key,
    phone: partial.phone || '',
    fullName: partial.fullName || '',
    username: partial.username,
    role: partial.role || 'fuqaro',
    plan: partial.plan || 'free',
    balance: partial.balance || 0,
    consultationsCount: partial.consultationsCount || 0,
    documentsCount: partial.documentsCount || 0,
    isRegistered: partial.isRegistered || false,
    registrationStep: partial.registrationStep || 'WAITING_CONTACT',
    createdAt: new Date().toISOString(),
    savedDocuments: partial.savedDocuments || [],
  };

  usersMap.set(key, newUser);
  return newUser;
}

export function addSavedDocument(
  telegramId: number | string,
  doc: { title: string; type: string; content: string }
): SavedLegalDocument | null {
  const user = getUser(telegramId);
  if (!user) return null;

  const newDoc: SavedLegalDocument = {
    id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: doc.title,
    type: doc.type,
    content: doc.content,
    createdAt: new Date().toISOString(),
  };

  user.savedDocuments.unshift(newDoc);
  user.documentsCount = user.savedDocuments.length;
  usersMap.set(String(telegramId), user);
  return newDoc;
}

export function getUserDocuments(telegramId: number | string): SavedLegalDocument[] {
  const user = getUser(telegramId);
  return user ? user.savedDocuments : [];
}

export function incrementConsultation(telegramId: number | string) {
  const user = getUser(telegramId);
  if (user) {
    user.consultationsCount += 1;
    usersMap.set(String(telegramId), user);
  }
}

export function getAllUsersCount(): number {
  return usersMap.size;
}
