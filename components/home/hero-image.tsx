"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME } from "@/contents";
import { getProduct, productPath } from "@/lib";

const products = HOME.hero.productSlugs.flatMap((slug) => {
  const product = getProduct(slug);
  return product ? [product] : [];
});

export function HeroImage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || products.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % products.length),
      HOME.hero.imageIntervalMs,
    );
    return () => window.clearInterval(id);
  }, [paused]);

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
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-center"
          />
        </Link>
      ))}
    </div>
  );
}
