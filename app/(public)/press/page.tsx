import { createMetadata } from "@/lib/seo/metadata";
import { PressClient } from "./press-client";

export const metadata = createMetadata({
  title: "Press",
  description:
    "Press releases, media kit, and company information for journalists and media professionals covering TajirJomla Hub.",
  path: "/press",
  keywords: ["press", "media", "news", "press release", "media kit", "journalists"],
});

export default function PressPage() {
  return <PressClient />;
}
