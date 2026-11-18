import { ProductsIntro, ProductList } from "@/components/products";
import { PRODUCTS_PAGE, ROUTES, SEO } from "@/contents";
import { pageMetadata } from "@/util/metadata";

export const metadata = pageMetadata({
  title: SEO.products.title,
  description: SEO.products.description,
  path: ROUTES.products,
  image: PRODUCTS_PAGE.offerImage,
});

export default function ProductsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <ProductsIntro />
      <ProductList />
    </main>
  );
}
