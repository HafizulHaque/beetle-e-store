import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetail } from "@/components/products";
import { JsonLd } from "@/components/seo";
import { PRODUCTS } from "@/contents";
import { getProduct, breadcrumbSchema, productPath, productSchema } from "@/lib";
import { pageMetadata } from "@/util/metadata";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: productPath(product.slug),
    image: product.image,
    shareSize: { width: 1200, height: 800 },
  });
}

async function ProductContent({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = product.relatedSlug ? getProduct(product.relatedSlug) : undefined;

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(product)} />
      <ProductDetail product={product} related={related} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-3/2 w-full animate-pulse rounded-2xl bg-zinc-100" />
        <div className="flex flex-col gap-4">
          <div className="h-9 w-2/3 animate-pulse rounded bg-zinc-100" />
          <div className="h-24 w-full animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
