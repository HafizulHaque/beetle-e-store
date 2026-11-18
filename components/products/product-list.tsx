import { PRODUCTS } from "@/contents";
import { ProductCard } from "./product-card";

export function ProductList() {
  return (
    <ul className="mt-8 flex flex-col gap-16">
      {PRODUCTS.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}