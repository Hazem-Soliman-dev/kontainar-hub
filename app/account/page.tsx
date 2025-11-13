import { createMetadata } from "../../lib/seo/metadata";
import { AccountClient } from "./account-client";

export const metadata = createMetadata({
  title: "Account Overview",
  description:
    "Manage your MarketHub profile, subscription preferences, and saved marketplace insights.",
  path: "/account",
});

export default function AccountPage() {
  return <AccountClient />;
}
