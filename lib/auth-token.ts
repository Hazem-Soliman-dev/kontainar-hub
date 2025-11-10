import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import type { PublicUser, UserRole } from "./mock/db";

const DEFAULT_SECRET = "development-secret";

const authSecret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? DEFAULT_SECRET,
);

export const AUTH_COOKIE = "auth_token";
export const TOKEN_EXPIRATION = "7d";

export interface AuthTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export async function generateAuthToken(user: PublicUser) {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(authSecret);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify<AuthTokenPayload>(token, authSecret);
  return payload;
}


