import type { Metadata } from "next";
import { BUSINESS, SEO } from "@/contents";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Dimensions of the `-share.jpg` copy; defaults to 1200x630. */
  shareSize?: { width: number; height: number };
  noindex?: boolean;
};

/** Per-page metadata. Titles are wrapped by the root layout's title template. */
export function pageMetadata({ title, description, path, image, shareSize, noindex }: PageMetadataInput): Metadata {
  // `<name>-share.jpg` is a copy under 150 KB: WhatsApp drops larger previews.
  const share = image?.replace(/\.jpg$/, "-share.jpg");
  const images = share ? [{ url: share, ...(shareSize ?? { width: 1200, height: 630 }) }] : undefined;
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
