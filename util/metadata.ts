import type { Metadata } from "next";
import { BUSINESS, SEO } from "@/contents";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

/** Per-page metadata. Titles are wrapped by the root layout's title template. */
export function pageMetadata({ title, description, path, image, noindex }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: SEO.locale,
      siteName: BUSINESS.name,
      title,
      description,
      url: path,
      images: image ? [image] : undefined,
    },
  };
}
