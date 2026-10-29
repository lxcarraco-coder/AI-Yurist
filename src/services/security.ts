import crypto from 'crypto';

export interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  user?: TelegramUserData;
  authDate?: number;
  error?: string;
}

/**
 * Validates Telegram WebApp initData string using official Telegram HMAC-SHA256 algorithm.
 * NEVER trust initDataUnsafe on client.
 */
export function validateTelegramInitData(initData: string, botToken: string): ValidationResult {
  if (!initData || !botToken) {
    return { valid: false, error: 'initData yoki bot_token taqdim etilmadi' };
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) {
      return { valid: false, error: 'Hash parametri topilmadi' };
    }

    urlParams.delete('hash');

    // Sort parameters alphabetically
    const paramsList: string[] = [];
    const keys = Array.from(urlParams.keys()).sort();
    for (const key of keys) {
      paramsList.push(`${key}=${urlParams.get(key)}`);
    }
    const dataCheckString = paramsList.join('\n');

    // secret_key = HMAC_SHA256("WebAppData", botToken)
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // calculated_hash = HMAC_SHA256(secret_key, data_check_string)
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      return { valid: false, error: 'Telegram imzosi (hash) mos kelmadi' };
    }

    // Check auth_date for expiration (max 24 hours)
    const authDateStr = urlParams.get('auth_date');
    const authDate = authDateStr ? parseInt(authDateStr, 10) : 0;
    const now = Math.floor(Date.now() / 1000);
    if (authDate > 0 && now - authDate > 86400) {
      return { valid: false, error: 'Telegram sessiyasi muddati o‘tgan (24 soatdan ortiq)' };
    }

    // Extract user JSON
    const userStr = urlParams.get('user');
    let user: TelegramUserData | undefined;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch {
        // Ignore json parse error
      }
    }

    return { valid: true, user, authDate };
  } catch (err: any) {
    return { valid: false, error: err?.message || 'Validatsiya xatosi' };
  }
}

/**
 * In-memory Free Quota & Rate Limiter
 * Per client IP or Telegram User ID
 */
interface UserQuotaEntry {
  requestsThisMinute: number;
  minuteResetTime: number;
  requestsToday: number;
  dayResetTime: number;
}

const quotaStore = new Map<string, UserQuotaEntry>();

// Configurable constants
export const RATE_LIMIT_PER_MINUTE = 15;
export const DAILY_FREE_QUOTA = 40; // 40 free questions per day

export function checkRateLimit(clientId: string): {
  allowed: boolean;
  remainingToday: number;
  dailyLimit: number;
  error?: string;
  resetInSeconds?: number;
} {
  const now = Date.now();
  let entry = quotaStore.get(clientId);

  if (!entry) {
    entry = {
      requestsThisMinute: 0,
      minuteResetTime: now + 60 * 1000,
      requestsToday: 0,
      dayResetTime: now + 24 * 60 * 60 * 1000,
    };
    quotaStore.set(clientId, entry);
  }

  // Reset 1-minute window
  if (now > entry.minuteResetTime) {
    entry.requestsThisMinute = 0;
    entry.minuteResetTime = now + 60 * 1000;
  }

  // Reset 24-hour window
  if (now > entry.dayResetTime) {
    entry.requestsToday = 0;
    entry.dayResetTime = now + 24 * 60 * 60 * 1000;
  }

  // Check burst limit (15 requests/min)
  if (entry.requestsThisMinute >= RATE_LIMIT_PER_MINUTE) {
    const waitSec = Math.ceil((entry.minuteResetTime - now) / 1000);
    return {
      allowed: false,
      remainingToday: Math.max(0, DAILY_FREE_QUOTA - entry.requestsToday),
      dailyLimit: DAILY_FREE_QUOTA,
      resetInSeconds: waitSec,
      error: `So‘rovlar soni me’yordan oshdi. Iltimos, ${waitSec} soniyadan keyin qayta urining (minutiga maksimal ${RATE_LIMIT_PER_MINUTE} ta so‘rov).`,
    };
  }

  // Check daily limit (40 requests/day)
  if (entry.requestsToday >= DAILY_FREE_QUOTA) {
    const hoursWait = Math.ceil((entry.dayResetTime - now) / (1000 * 60 * 60));
    return {
      allowed: false,
      remainingToday: 0,
      dailyLimit: DAILY_FREE_QUOTA,
      error: `Bugungi kunlik bepul so‘rovlar limiti (${DAILY_FREE_QUOTA} ta) tugadi. Tizim jamoat xizmati sifatida barcha foydalanuvchilar uchun bepul taqdim etiladi va yangi limit ${hoursWait} soatdan keyin yangilanadi.`,
    };
  }

  // Increment counters
  entry.requestsThisMinute += 1;
  entry.requestsToday += 1;

  return {
    allowed: true,
    remainingToday: DAILY_FREE_QUOTA - entry.requestsToday,
    dailyLimit: DAILY_FREE_QUOTA,
  };
}

export function getUserQuotaStatus(clientId: string) {
  const now = Date.now();
  const entry = quotaStore.get(clientId);
  if (!entry || now > entry.dayResetTime) {
    return {
      usedToday: 0,
      remainingToday: DAILY_FREE_QUOTA,
      dailyLimit: DAILY_FREE_QUOTA,
    };
  }
  return {
    usedToday: entry.requestsToday,
    remainingToday: Math.max(0, DAILY_FREE_QUOTA - entry.requestsToday),
    dailyLimit: DAILY_FREE_QUOTA,
  };
}

// Global System Analytics (Lightweight)
export interface SystemStats {
  totalQueries: number;
  totalDocumentsGenerated: number;
  uniqueUsersToday: Set<string>;
  errorsCount: number;
  startTime: number;
}

export const systemStats: SystemStats = {
  totalQueries: 48,
  totalDocumentsGenerated: 16,
  uniqueUsersToday: new Set<string>(['system-init']),
  errorsCount: 0,
  startTime: Date.now(),
};

export function recordSystemQuery(clientId: string) {
  systemStats.totalQueries += 1;
  systemStats.uniqueUsersToday.add(clientId);
}

export function recordDocumentGeneration(clientId: string) {
  systemStats.totalDocumentsGenerated += 1;
  systemStats.uniqueUsersToday.add(clientId);
}

export function recordSystemError() {
  systemStats.errorsCount += 1;
}
