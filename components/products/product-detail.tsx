import Image from "next/image";
import Link from "next/link";
import { PRODUCT_DETAIL, ROUTES } from "@/contents";
import { ButtonLink } from "@/components/ui";
import type { Product } from "@/lib/types";
import { whatsappUrl } from "@/util/whatsapp";
import { ProductPurchase } from "./product-purchase";
import { RelatedProductLink } from "./related-product-link";
import { StockBadge } from "./stock-badge";

type ProductDetailProps = {
  product: Product;
  related?: Product;
};

export function ProductDetail({ product, related }: ProductDetailProps) {
  return (
    <article className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <nav aria-label={PRODUCT_DETAIL.breadcrumbLabel} className="mb-6 text-sm text-zinc-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link href={ROUTES.products} className="hover:text-ink hover:underline">
              {PRODUCT_DETAIL.breadcrumbLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-zinc-100">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{PRODUCT_DETAIL.usageHeading}</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700">
              {product.usage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {related && <RelatedProductLink product={related} />}
        </div>

        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl leading-snug font-bold">{product.name}</h1>
            <p className="text-zinc-700">{product.description}</p>
            <StockBadge inStock={product.inStock} />
          </header>

          {product.inStock ? (
            <ProductPurchase product={product} />
          ) : (
            <ButtonLink
              href={whatsappUrl(PRODUCT_DETAIL.outOfStockMessage(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="rounded-lg px-4"
            >
              {PRODUCT_DETAIL.askOnWhatsapp}
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}
