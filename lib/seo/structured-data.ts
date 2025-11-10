import { seoConfig } from "./metadata";

type ContactPoint = {
  contactType: string;
  email?: string;
  telephone?: string;
};

export function buildOrganizationLd({
  name = seoConfig.siteName,
  url = seoConfig.siteUrl,
  logo = `${seoConfig.siteUrl}${seoConfig.defaultImage.url}`,
  description,
  sameAs = [],
  contactPoint,
  areaServed,
}: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: ContactPoint[];
  areaServed?: string | string[];
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    areaServed,
    sameAs,
    contactPoint:
      contactPoint?.map((point) => ({
        "@type": "ContactPoint",
        ...point,
      })) ?? undefined,
  };
}

export function buildWebsiteLd({
  siteName = seoConfig.siteName,
  siteUrl = seoConfig.siteUrl,
  searchPath,
}: {
  siteName?: string;
  siteUrl?: string;
  searchPath?: string;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: searchPath
      ? {
          "@type": "SearchAction",
          target: `${siteUrl}${searchPath}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  };
}

export function buildItemListLd(
  name: string,
  items: Array<{
    name: string;
    description?: string;
    url?: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };
}

export function buildProductLd({
  name,
  description,
  category,
  url,
  brand,
}: {
  name: string;
  description: string;
  category?: string;
  url?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    category,
    url,
    brand: brand
      ? {
          "@type": "Brand",
          name: brand,
        }
      : undefined,
  };
}

export function buildOfferLd({
  name,
  description,
  price,
  priceCurrency = "USD",
  url,
  eligibleDuration,
}: {
  name: string;
  description: string;
  price: number;
  priceCurrency?: string;
  url?: string;
  eligibleDuration?: {
    value: number;
    unitCode: "DAY" | "MON" | "ANN";
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    price,
    priceCurrency,
    url,
    availability: "https://schema.org/InStock",
    eligibleDuration: eligibleDuration
      ? {
          "@type": "QuantitativeValue",
          value: eligibleDuration.value,
          unitCode: eligibleDuration.unitCode,
        }
      : undefined,
  };
}

