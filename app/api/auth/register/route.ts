import { NextResponse } from "next/server";

import {
  AUTH_COOKIE,
  buildAuthUser,
  generateAuthToken,
  getCookieOptions,
  hashPassword,
} from "../../../../lib/auth";
import {
  mockDb,
  type PublicUser,
  type UserRole,
} from "../../../../lib/mock/db";

interface RegisterBody {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  password?: unknown;
  role?: unknown;
  businessName?: unknown;
  businessType?: unknown;
}

type ValidRegisterBody = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  businessName: string;
  businessType: string;
};

function validateBody(
  body: RegisterBody
):
  | { success: true; data: ValidRegisterBody }
  | { success: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { success: false, error: "Invalid request payload." };
  }

  const { fullName, email, phone, password, role, businessName, businessType } =
    body;

  if (
    !isNonEmptyString(fullName) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(password) ||
    !isNonEmptyString(businessName) ||
    !isNonEmptyString(businessType)
  ) {
    return { success: false, error: "All fields are required." };
  }

  if (typeof role !== "string" || !["supplier", "trader"].includes(role)) {
    return { success: false, error: "Role must be either supplier or trader." };
  }

  return {
    success: true,
    data: {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      role: role as UserRole,
      businessName: businessName.trim(),
      businessType: businessType.trim(),
    },
  };
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: Request) {
  let payload: RegisterBody;

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

  const { email, phone, password, ...rest } = validation.data;

  if (mockDb.getUserByEmail(email)) {
    return NextResponse.json(
      { message: "A user with that email already exists." },
      { status: 409 }
    );
  }

  if (mockDb.getUserByPhone(phone)) {
    return NextResponse.json(
      { message: "A user with that phone number already exists." },
      { status: 409 }
    );
  }

  const passwordHash = hashPassword(password);
  const publicUser = mockDb.createUser({
    email,
    phone,
    passwordHash,
    ...rest,
  });

  return respondWithToken(publicUser, { status: 201 });
}

async function respondWithToken(user: PublicUser, init?: ResponseInit) {
  const token = await generateAuthToken(user);
  const response = NextResponse.json(
    {
      user: buildAuthUser(user),
      token,
    },
    init
  );

  response.cookies.set(AUTH_COOKIE, token, getCookieOptions());

  return response;
}
