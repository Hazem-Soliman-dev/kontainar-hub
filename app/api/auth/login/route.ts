import { NextResponse } from "next/server";

import { verifyPassword } from "../../../../lib/auth";
import { respondWithAuthSuccess } from "../../../../lib/auth-response";
import { mockDb, toPublicUser } from "../../../../lib/mock/db";

interface LoginBody {
  email?: unknown;
  phone?: unknown;
  identifier?: unknown;
  password?: unknown;
}

type ValidLoginBody = {
  identifier: string;
  password: string;
};

export async function POST(request: Request) {
  let payload: LoginBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Unable to parse request body." },
      { status: 400 }
    );
  }

  const validation = validateBody(payload);

  if (!validation.success) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  const { identifier, password } = validation.data;
  const user = mockDb.getUserByEmailOrPhone(identifier);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json(
      { message: "Invalid credentials." },
      { status: 401 }
    );
  }

  return respondWithAuthSuccess(toPublicUser(user));
}

function validateBody(
  body: LoginBody
): { success: true; data: ValidLoginBody } | { success: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { success: false, error: "Invalid request payload." };
  }

  const identifierCandidate =
    typeof body.identifier === "string" && body.identifier.trim()
      ? body.identifier.trim()
      : typeof body.email === "string" && body.email.trim()
      ? body.email.trim()
      : typeof body.phone === "string" && body.phone.trim()
      ? body.phone.trim()
      : "";

  if (!identifierCandidate) {
    return {
      success: false,
      error: "Provide an email or phone number to login.",
    };
  }

  if (typeof body.password !== "string" || body.password.length === 0) {
    return { success: false, error: "Password is required." };
  }

  return {
    success: true,
    data: {
      identifier: identifierCandidate,
      password: body.password,
    },
  };
}

