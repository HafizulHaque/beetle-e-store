import { PIECE_UNIT, PRODUCTS, PURCHASE, ROUTES } from "@/contents";
import { formatBdt } from "@/util";
import type { PriceTier, Product } from "./types";

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productPath(slug: string): string {
  return `${ROUTES.products}/${slug}`;
}

export function getTier(product: Product, tierId: string): PriceTier | undefined {
  return product.tiers.find((t) => t.id === tierId);
}

/** The price actually charged for a tier: the offer price if set, else the regular price. */
export function tierPrice(tier: PriceTier): number {
  return tier.offerPriceBdt ?? tier.priceBdt;
}

/** Per-piece price text, shown only for products sold by the piece. */
export function perPieceText(product: Product, tier: PriceTier): string | null {
  if (product.unit !== PIECE_UNIT) return null;
  const perPiece = Number((tierPrice(tier) / tier.quantity).toFixed(2));
  return `${PURCHASE.perPiece} ${formatBdt(perPiece)}`;
}
