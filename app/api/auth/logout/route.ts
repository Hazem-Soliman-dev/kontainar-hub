import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIE } from "../../../../lib/auth-token";

/**
 * Logout endpoint - clears the authentication cookie
 */
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);

  return NextResponse.json({ success: true });
}

