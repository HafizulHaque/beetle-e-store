import Link from "next/link";
import { HOME, PRODUCTS } from "@/contents";
import { cardVariants } from "@/components/ui";
import { productPath } from "@/lib";
import { cn } from "@/util/cn";

export function ProductHighlights() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold">{HOME.products.heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={productPath(product.slug)}
            className={cn(cardVariants({ tone: "ink", padding: "lg" }), "hover:bg-black")}
          >
            <h3 className="text-xl font-bold text-brand">{product.name}</h3>
            <p className="mt-2 text-sm leading-relaxed">{product.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
