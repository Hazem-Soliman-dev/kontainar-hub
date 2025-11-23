import { createMetadata } from "@/lib/seo/metadata";
import { CareersClient } from "./careers-client";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Join the TajirJomla Hub team and help shape the future of global trade. Explore open positions and learn about our culture.",
  path: "/careers",
  keywords: ["careers", "jobs", "employment", "hiring", "work with us"],
});

export default function CareersPage() {
  return <CareersClient />;
}
