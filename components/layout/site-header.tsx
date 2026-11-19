import Image from "next/image";
import Link from "next/link";
import { BUSINESS, NAV, ROUTES } from "@/contents";
import { CartLink } from "./cart-link";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white text-ink">
      <div className="relative mx-auto grid h-16 max-w-6xl grid-cols-3 items-center px-4 md:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center justify-start md:hidden">
          <MobileMenu />
        </div>

        <Link
          href={ROUTES.home}
          aria-label={BUSINESS.nameEn}
          className="justify-self-center md:justify-self-start"
        >
          <Image
            src="/images/miah-farming-logo-264.webp"
            alt={BUSINESS.nameEn}
            width={88}
            height={44}
            unoptimized
            loading="eager"
            className="h-11 w-auto"
          />
        </Link>

        <div className="flex items-center justify-end gap-2 md:col-start-3">
          <nav aria-label={NAV.desktopLabel} className="hidden items-center text-sm font-medium md:flex">
            {NAV.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex h-11 items-center px-3 hover:text-brand-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CartLink />
        </div>
      </div>
    </header>
  );
}
