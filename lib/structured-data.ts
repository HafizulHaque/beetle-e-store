import { BUSINESS, HOME, PRODUCT_DETAIL, ROUTES, SEO } from "@/contents";
import { absoluteUrl, SITE_URL } from "@/util";
import { getProduct, productPath, tierPrice } from "./products";
import type { Product } from "./types";

export function localBusinessSchema() {
  const heroImage = getProduct(HOME.hero.productSlug)?.image;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    alternateName: BUSINESS.nameEn,
    description: SEO.home.structuredDataDescription,
    url: SITE_URL,
    telephone: BUSINESS.phoneDisplay,
    image: heroImage && absoluteUrl(heroImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.localAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

export function breadcrumbSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: PRODUCT_DETAIL.breadcrumbLabel, item: absoluteUrl(ROUTES.products) },
      { "@type": "ListItem", position: 2, name: product.name, item: absoluteUrl(productPath(product.slug)) },
    ],
  };
}

export function productSchema(product: Product) {
  const prices = product.tiers.map(tierPrice);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: product.nameEn,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl(productPath(product.slug)),
      priceCurrency: "BDT",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.tiers.length,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}
