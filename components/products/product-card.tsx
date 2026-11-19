import Image from "next/image";
import Link from "next/link";
import { productPath } from "@/lib";
import type { Product } from "@/lib/types";
import { ProductPurchase } from "./product-purchase";
import { StockBadge } from "./stock-badge";

export function ProductCard({ product, isFirst }: { product: Product; isFirst: boolean }) {
  const href = productPath(product.slug);

  return (
    <article className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
      <Link
        href={href}
        className="relative block aspect-3/2 w-full overflow-hidden rounded-2xl bg-zinc-100 md:w-1/2"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
          sizes="(min-width: 1152px) 544px, (min-width: 768px) calc((100vw - 64px) / 2), calc(100vw - 32px)"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-4 md:w-1/2">
        <Link href={href}>
          <h3 className="text-lg leading-snug font-bold hover:underline">{product.name}</h3>
        </Link>
        <StockBadge inStock={product.inStock} />
        <ProductPurchase product={product} />
      </div>
    </article>
  );
}
