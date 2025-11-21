import { createMetadata } from "../../../lib/seo/metadata";

const metadata = createMetadata({
  title: "Access Your TajirJomla Hub Workspace",
  description:
    "Log in with your email or phone number to manage supplier relationships, orders, and analytics on TajirJomla Hub.",
  path: "/login",
  twitter: {
    card: "summary_large_image",
    title: "Access Your TajirJomla Hub Workspace",
    description:
      "Log in with your email or phone number to manage supplier relationships, orders, and analytics on TajirJomla Hub.",
    images: [
      {
        url: "https://tajirjomlahub.com/images/login-card.jpg",
      },
    ],
  },
  noIndex: true,
});

export default metadata;
