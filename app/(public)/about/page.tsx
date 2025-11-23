import { createMetadata } from "@/lib/seo/metadata";
import { AboutClient } from "./about-client";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about TajirJomla Hub, your trusted multi-vendor marketplace connecting buyers with quality stores worldwide.",
  path: "/about",
  keywords: ["about", "company", "marketplace", "mission", "vision"],
});

export default function AboutPage() {
  return <AboutClient />;
}
