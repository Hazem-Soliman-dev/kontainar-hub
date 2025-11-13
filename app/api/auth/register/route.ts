import { NextResponse } from "next/server";

import { hashPassword } from "../../../../lib/auth";
import { respondWithAuthSuccess } from "../../../../lib/auth-response";
import { mockDb, type UserRole } from "../../../../lib/mock/db";
import { startTrial } from "../../../../lib/mock/subscriptions";

interface RegisterBody {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  password?: unknown;
  confirmPassword?: unknown;
  role?: unknown;
  businessName?: unknown;
  businessType?: unknown;
}

type ValidRegisterBody = {
  firstName: string;
  lastName: string;
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

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    role,
    businessName,
    businessType,
  } = body;

  if (
    !isNonEmptyString(firstName) ||
    !isNonEmptyString(lastName) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(password) ||
    !isNonEmptyString(businessName) ||
    !isNonEmptyString(businessType)
  ) {
    return { success: false, error: "All fields are required." };
  }

  if (
    typeof confirmPassword === "string" &&
    confirmPassword.length > 0 &&
    confirmPassword !== password
  ) {
    return {
      success: false,
      error: "Password confirmation does not match.",
    };
  }

  if (typeof role !== "string" || !["supplier", "trader"].includes(role)) {
    return { success: false, error: "Role must be either supplier or trader." };
  }

  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();

  return {
    success: true,
    data: {
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      fullName: `${normalizedFirstName} ${normalizedLastName}`.replace(
        /\s+/g,
        " "
      ),
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

  const { email, phone, password, firstName, lastName, ...rest } =
    validation.data;
  void firstName;
  void lastName;

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
    ...rest,
    email,
    phone,
    passwordHash,
  });

  const subscription = startTrial(publicUser.id, rest.role);

  return respondWithAuthSuccess(publicUser, { status: 201 }, { subscription });
}
