import { randomUUID } from 'node:crypto';

export type UserRole = 'supplier' | 'trader';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: UserRole;
  businessName: string;
  businessType: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Omit<UserRecord, 'passwordHash'>;

export interface CreateUserInput {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: UserRole;
  businessName: string;
  businessType: string;
}

const users = new Map<string, UserRecord>();

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, '');

export const mockDb = {
  createUser(data: CreateUserInput): PublicUser {
    const id = randomUUID();
    const now = new Date();

    const record: UserRecord = {
      id,
      createdAt: now,
      updatedAt: now,
      ...data,
      email: normalizeEmail(data.email),
      phone: normalizePhone(data.phone),
    };

    users.set(id, record);
    return toPublicUser(record);
  },

  getUserByEmail(email: string): UserRecord | undefined {
    const normalized = normalizeEmail(email);
    return findUser((user) => user.email === normalized);
  },

  getUserByPhone(phone: string): UserRecord | undefined {
    const normalized = normalizePhone(phone);
    return findUser((user) => user.phone === normalized);
  },

  getUserByEmailOrPhone(identifier: string): UserRecord | undefined {
    return (
      mockDb.getUserByEmail(identifier) ??
      mockDb.getUserByPhone(identifier)
    );
  },

  listUsers(): PublicUser[] {
    return Array.from(users.values()).map(toPublicUser);
  },
};

function findUser(predicate: (user: UserRecord) => boolean) {
  for (const user of users.values()) {
    if (predicate(user)) {
      return user;
    }
  }
  return undefined;
}

export function toPublicUser(user: UserRecord): PublicUser {
  const { passwordHash, ...publicFields } = user;
  void passwordHash;
  return publicFields;
}

