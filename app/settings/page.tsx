import { createMetadata } from "../../lib/seo/metadata";
import { SettingsClient } from "./settings-client";

export const metadata = createMetadata({
  title: "Settings",
  description:
    "Manage your notification preferences and privacy settings",
  path: "/settings",
});

export default function SettingsPage() {
  return <SettingsClient />;
}
