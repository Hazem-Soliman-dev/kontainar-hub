import { createHmac, timingSafeEqual } from 'node:crypto';

import type { PublicUser } from './mock/db';
export {
  AUTH_COOKIE,
  TOKEN_EXPIRATION,
  type AuthTokenPayload,
  generateAuthToken,
  verifyAuthToken,
} from './auth-token';

const DEFAULT_SALT = 'development-salt';
const passwordSalt = process.env.AUTH_SALT ?? DEFAULT_SALT;

export function hashPassword(password: string) {
  return createHmac('sha256', passwordSalt).update(password).digest('hex');
}

export function verifyPassword(password: string, storedHash: string) {
  const incomingHash = hashPassword(password);
  const incomingBuffer = Buffer.from(incomingHash, 'hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');

  if (incomingBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(incomingBuffer, storedBuffer);
}

export function buildAuthUser(user: PublicUser) {
  const { createdAt, updatedAt, ...rest } = user;
  return {
    ...rest,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: isProduction,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}

