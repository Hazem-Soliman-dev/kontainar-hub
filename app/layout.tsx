import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { JsonLd } from "../components/seo/json-ld";
import { ThemeScript } from "../components/theme-script";
import { HydrationProvider } from "../components/providers/hydration-provider";
import { createMetadata } from "../lib/seo/metadata";
import {
  buildOrganizationLd,
  buildWebsiteLd,
} from "../lib/seo/structured-data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: "TajirJomla Hub | Global Trade Intelligence",
  description:
    "TajirJomla Hub connects suppliers and traders with real-time analytics, store management, and marketplace insights.",
  path: "/",
  keywords: [
    "global trade",
    "supply chain",
    "marketplace",
    "supplier analytics",
    "trader dashboard",
  ],
  withTitleTemplate: true,
});

const organizationStructuredData = [
  buildOrganizationLd({
    sameAs: [
      "https://www.linkedin.com/company/tajirjomlahub",
      "https://twitter.com/tajirjomlahub",
    ],
    contactPoint: [
      {
        contactType: "sales",
        email: "sales@tajirjomlahub.com",
      },
    ],
  }),
  buildWebsiteLd({ searchPath: "/search" }),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <JsonLd data={organizationStructuredData} id="global-structured-data" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <HydrationProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
