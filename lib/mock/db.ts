import { createHmac, randomUUID } from "node:crypto";

import { startTrial } from "./subscriptions";

export type UserRole = "supplier" | "trader";

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

export type PublicUser = Omit<UserRecord, "passwordHash">;

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
const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

const DEFAULT_SALT = "development-salt";
const passwordSalt = process.env.AUTH_SALT ?? DEFAULT_SALT;

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
      mockDb.getUserByEmail(identifier) ?? mockDb.getUserByPhone(identifier)
    );
  },

  getUserById(id: string): UserRecord | undefined {
    return users.get(id);
  },

  updateUserRole(userId: string, role: UserRole): PublicUser | null {
    const user = users.get(userId);
    if (!user) {
      return null;
    }

    const updatedUser: UserRecord = {
      ...user,
      role,
      updatedAt: new Date(),
    };

    users.set(userId, updatedUser);
    return toPublicUser(updatedUser);
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

function hashSeedPassword(password: string) {
  return createHmac("sha256", passwordSalt).update(password).digest("hex");
}

function seedInitialUsers() {
  if (users.size > 0) {
    return;
  }

  const seeds: Array<{
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    businessName: string;
    businessType: string;
  }> = [
    {
      fullName: "Aurora Commodities Lead",
      email: "supplier.demo@tajirjomlahub.com",
      phone: "+15550001111",
      password: "Supplier#2025",
      role: "supplier",
      businessName: "Aurora Commodities",
      businessType: "Wholesale Coffee & Commodities",
    },
    {
      fullName: "Northwind Trading Ops",
      email: "trader.demo@tajirjomlahub.com",
      phone: "+15550002222",
      password: "Trader#2025",
      role: "trader",
      businessName: "Northwind Trading",
      businessType: "Global Trade & Distribution",
    },
  ];

  for (const seed of seeds) {
    if (
      mockDb.getUserByEmail(seed.email) ||
      mockDb.getUserByPhone(seed.phone)
    ) {
      continue;
    }

    const passwordHash = hashSeedPassword(seed.password);
    const user = mockDb.createUser({
      fullName: seed.fullName,
      email: seed.email,
      phone: seed.phone,
      passwordHash,
      role: seed.role,
      businessName: seed.businessName,
      businessType: seed.businessType,
    });

    try {
      startTrial(user.id, seed.role);
    } catch {
      // ignore seeding trial errors in mock environment
    }
  }
}

seedInitialUsers();
