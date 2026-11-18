import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { FloatingWhatsApp, SiteFooter, SiteHeader } from "@/components/layout";
import { BUSINESS, SEO } from "@/contents";
import { SITE_URL } from "@/util/url";
import "./globals.css";

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.siteTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.siteDescription,
  applicationName: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: SEO.locale,
    siteName: BUSINESS.name,
    title: SEO.siteTitle,
    description: SEO.siteDescription,
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${bengali.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
