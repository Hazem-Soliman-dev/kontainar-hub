import { NextResponse } from "next/server";

interface ContactBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
}

type ValidContactBody = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const validSubjects = ["general", "sales", "support", "partnership", "technical"];

function validateBody(
  body: ContactBody
): { success: true; data: ValidContactBody } | { success: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { success: false, error: "Invalid request payload." };
  }

  const { name, email, phone, subject, message } = body;

  if (!isNonEmptyString(name)) {
    return { success: false, error: "Name is required." };
  }

  if (!isNonEmptyString(email)) {
    return { success: false, error: "Email is required." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!isNonEmptyString(message)) {
    return { success: false, error: "Message is required." };
  }

  if (message.trim().length < 10) {
    return { success: false, error: "Message must be at least 10 characters long." };
  }

  // Subject validation
  if (typeof subject !== "string" || !validSubjects.includes(subject)) {
    return {
      success: false,
      error: `Subject must be one of: ${validSubjects.join(", ")}.`,
    };
  }

  return {
    success: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: Request) {
  let payload: ContactBody;

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

  const { name, email, phone, subject, message } = validation.data;

  // In a real application, you would:
  // 1. Save the contact form submission to a database
  // 2. Send an email notification to the support team
  // 3. Optionally send a confirmation email to the user
  // 4. Log the submission for tracking

  // For now, we'll just return a success response
  // You can integrate with services like:
  // - SendGrid, Resend, or Nodemailer for emails
  // - A database (PostgreSQL, MongoDB, etc.) for storage
  // - A logging service for analytics

  console.log("Contact form submission:", {
    name,
    email,
    phone,
    subject,
    message: message.substring(0, 100) + "...", // Log first 100 chars only
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      message: "Thank you for contacting us! We'll get back to you soon.",
      success: true,
    },
    { status: 200 }
  );
}

