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
  // `<name>-share.jpg` is a 1200x630 (1.91:1) copy under 150 KB: WhatsApp drops larger previews and shows landscape only at this ratio.
  const share = image?.replace(/\.jpg$/, "-share.jpg");
  const images = share ? [{ url: share, width: 1200, height: 630 }] : undefined;
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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
