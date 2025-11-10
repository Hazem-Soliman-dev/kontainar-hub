import { createMetadata } from "../../../lib/seo/metadata";

const metadata = createMetadata({
  title: "Access Your Kontainar Hub Workspace",
  description:
    "Log in with your email or phone number to manage supplier relationships, orders, and analytics on Kontainar Hub.",
  path: "/login",
  twitter: {
    card: "summary_large_image",
    title: "Access Your Kontainar Hub Workspace",
    description:
      "Log in with your email or phone number to manage supplier relationships, orders, and analytics on Kontainar Hub.",
    images: [
      {
        url: "https://kontainarhub.com/images/login-card.jpg",
      },
    ],
  },
  noIndex: true,
});

export default metadata;
