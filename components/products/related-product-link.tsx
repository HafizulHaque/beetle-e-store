import Image from "next/image";
import Link from "next/link";
import { PRODUCT_DETAIL } from "@/contents";
import { cardVariants } from "@/components/ui";
import { productPath } from "@/lib";
import type { Product } from "@/lib/types";
import { cn } from "@/util/cn";

export function RelatedProductLink({ product }: { product: Product }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">{PRODUCT_DETAIL.relatedHeading}</h2>
      <Link
        href={productPath(product.slug)}
        className={cn(
          cardVariants({ interactive: true, padding: "sm" }),
          "flex gap-3 overflow-hidden shadow-sm ring-1 ring-zinc-200",
        )}
      >
        <div className="relative aspect-3/2 w-32 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{product.name}</p>
          <p className="text-sm text-zinc-600">{product.description}</p>
        </div>
      </Link>
    </section>
  );
}
