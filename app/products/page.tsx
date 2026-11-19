import { ProductsIntro, ProductList } from "@/components/products";
import { ROUTES, SEO } from "@/contents";
import { pageMetadata } from "@/util/metadata";

export const metadata = pageMetadata({
  title: SEO.products.title,
  description: SEO.products.description,
  path: ROUTES.products,
  image: "/images/superworm.jpg",
  shareSize: { width: 1200, height: 800 },
});

export default function ProductsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <ProductsIntro />
      <ProductList />
    </main>
  );
}
