import { PRODUCT_DETAIL } from "@/contents";

export function StockBadge({ inStock }: { inStock: boolean }) {
  const tone = inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${tone}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${inStock ? "animate-pulse bg-green-700" : "bg-red-700"}`}
      />
      {inStock ? PRODUCT_DETAIL.inStock : PRODUCT_DETAIL.outOfStock}
    </span>
  );
}
