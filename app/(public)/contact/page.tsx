import type { Metadata } from "next";
import { ContactPageContent } from "./contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us | TajirJomla Hub",
  description:
    "Get in touch with our team for support, sales inquiries, or general questions.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
