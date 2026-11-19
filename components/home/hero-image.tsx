"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME } from "@/contents";
import { getProduct, productPath } from "@/lib";
import { usePageLoaded } from "./use-page-loaded";

const products = HOME.hero.productSlugs.flatMap((slug) => {
  const product = getProduct(slug);
  return product ? [product] : [];
});

export function HeroImage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageLoaded = usePageLoaded();

  useEffect(() => {
    if (!pageLoaded || paused || products.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % products.length),
      HOME.hero.imageIntervalMs,
    );
    return () => window.clearInterval(id);
  }, [pageLoaded, paused]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-white"
    >
      {products.map((product, i) => (
        <Link
          key={product.slug}
          href={productPath(product.slug)}
          aria-hidden={i !== active}
          tabIndex={i === active ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {(i === 0 || pageLoaded) && (
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              preload={i === 0}
              sizes="(min-width: 1024px) 484px, (min-width: 768px) calc((100vw - 56px) / 2), calc(100vw - 32px)"
              className="object-cover object-center"
            />
          )}
        </Link>
      ))}
    </div>
  );
}
