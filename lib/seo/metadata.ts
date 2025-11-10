import type { Metadata } from "next";

type CanonicalOptions = {
  path?: string;
};

export type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  withTitleTemplate?: boolean;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
  alternates?: Metadata["alternates"];
  twitter?: Partial<NonNullable<Metadata["twitter"]>>;
};

export const seoConfig = {
  siteName: "Kontainar Hub",
  siteUrl: "https://kontainarhub.com",
  defaultDescription:
    "Kontainar Hub is a mock B2B marketplace showcasing supplier-trader workflows, analytics, and subscription flows.",
  defaultImage: {
    url: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1200&q=80",
    width: 1200,
    height: 630,
    alt: "Kontainar Hub marketplace preview",
  },
  twitterHandle: "@kontainarhub",
};

export function buildCanonicalUrl({ path }: CanonicalOptions = {}) {
  if (!path) {
    return seoConfig.siteUrl;
  }

  try {
    const url = new URL(path, seoConfig.siteUrl);
    return url.toString();
  } catch {
    return `${seoConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  }
}

export function createMetadata({
  title,
  description = seoConfig.defaultDescription,
  path,
  keywords,
  noIndex = false,
  withTitleTemplate = false,
  openGraph,
  alternates,
  twitter,
}: CreateMetadataOptions = {}): Metadata {
  const canonicalUrl = buildCanonicalUrl({ path });
  const baseTitle = title ?? seoConfig.siteName;
  const ogTitle = withTitleTemplate
    ? `${baseTitle} | ${seoConfig.siteName}`
    : baseTitle;

  const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: withTitleTemplate
      ? {
          default: baseTitle,
          template: `%s | ${seoConfig.siteName}`,
        }
      : baseTitle,
    description,
    keywords,
    alternates: alternates ?? {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      title: ogTitle,
      description,
      images: [
        {
          url: seoConfig.defaultImage.url,
          width: seoConfig.defaultImage.width,
          height: seoConfig.defaultImage.height,
          alt: seoConfig.defaultImage.alt,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: ogTitle,
      description,
      images: [seoConfig.defaultImage.url],
      ...twitter,
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
