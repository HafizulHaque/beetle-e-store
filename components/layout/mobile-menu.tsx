"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV } from "@/contents";
import { Button } from "@/components/ui";
import { MenuIcon } from "@/components/icons/ui-icons";
import { ContactLinks } from "./contact-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? NAV.closeMenu : NAV.openMenu}
      >
        <MenuIcon open={open} />
      </Button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={NAV.mainLabel}
          className="absolute top-full left-0 w-full rounded-b-2xl border-b border-zinc-200 bg-white shadow-md"
        >
          <ul className="flex flex-col py-2">
            {NAV.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-base font-medium hover:bg-brand/20"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ContactLinks variant="menu" onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
