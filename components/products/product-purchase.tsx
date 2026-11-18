"use client";

import { PRODUCT_DETAIL, PURCHASE, ROUTES } from "@/contents";
import { Button, ButtonLink } from "@/components/ui";
import { addToCart, setCartQty, useCart } from "@/lib/cart";
import { perPieceText } from "@/lib/products";
import type { Product } from "@/lib/types";
import { formatBdt } from "@/util/format";
import { whatsappUrl } from "@/util/whatsapp";
import { MinusIcon, PlusIcon } from "@/components/icons/ui-icons";
import { WholesaleOffer } from "./wholesale-offer";

export function ProductPurchase({ product }: { product: Product }) {
  const cart = useCart();
  const { inStock } = product;
  const qtyOf = (tierId: string) =>
    inStock ? (cart.find((i) => i.slug === product.slug && i.tier === tierId)?.qty ?? 0) : 0;
  const hasSelection = product.tiers.some((t) => qtyOf(t.id) > 0);

  return (
    <div className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-bold">{PURCHASE.legend}</legend>
        {product.tiers.map((t) => {
          const qty = qtyOf(t.id);
          const selected = qty > 0;
          const perPiece = perPieceText(product, t);
          const hasOffer = t.offerPriceBdt !== undefined;
          return (
            <div
              key={t.id}
              className={`rounded-lg ring-1 ${
                selected ? "bg-brand ring-2 ring-ink" : "bg-white ring-zinc-300"
              } ${inStock ? "" : "opacity-50"}`}
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  type="button"
                  disabled={!inStock}
                  aria-pressed={selected}
                  onClick={() => {
                    if (!selected) addToCart(product.slug, t.id);
                  }}
                  className="min-w-0 flex-1 cursor-pointer text-left leading-none font-bold disabled:cursor-not-allowed"
                >
                  {t.label}
                </button>
                {selected && (
                  <div className="mr-1 flex h-5 shrink-0 items-center gap-1 leading-none md:mr-3">
                    <Button
                      variant="outline"
                      size="stepper"
                      aria-label={PURCHASE.decrease(t.label)}
                      onClick={() => setCartQty(product.slug, t.id, qty - 1)}
                      className="rounded-md shadow-md"
                    >
                      <MinusIcon />
                    </Button>
                    <span className="flex h-7 min-w-8 items-center justify-center text-sm leading-none font-bold">
                      {qty}
                    </span>
                    <Button
                      variant="outline"
                      size="stepper"
                      aria-label={PURCHASE.increase(t.label)}
                      onClick={() => setCartQty(product.slug, t.id, qty + 1)}
                      className="rounded-md shadow-md"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                )}
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={!inStock}
                  onClick={() => {
                    if (!selected) addToCart(product.slug, t.id);
                  }}
                  className="w-20 shrink-0 cursor-pointer text-right disabled:cursor-not-allowed md:w-28"
                >
                  <s
                    className={`block text-xs text-zinc-600 ${hasOffer ? "" : "invisible"}`}
                  >
                    {formatBdt(t.priceBdt)}
                  </s>
                  <span className={`block font-bold ${hasOffer ? "text-red-600" : ""}`}>
                    {formatBdt(t.offerPriceBdt ?? t.priceBdt)}
                  </span>
                  {perPiece && (
                    <span className="block text-xs text-zinc-700">{perPiece}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </fieldset>

      <WholesaleOffer offer={product.wholesaleOffer} className="text-sm font-medium text-zinc-700" />

      {!inStock ? (
        <ButtonLink
          href={whatsappUrl(PRODUCT_DETAIL.outOfStockMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          className="w-full rounded-lg px-4"
        >
          {PRODUCT_DETAIL.askOnWhatsapp}
        </ButtonLink>
      ) : hasSelection ? (
        <ButtonLink href={ROUTES.order} size="lg" className="w-full rounded-lg px-4">
          {PURCHASE.orderNow}
        </ButtonLink>
      ) : (
        <Button variant="muted" size="lg" disabled className="w-full rounded-lg px-4 text-base">
          {PURCHASE.addToCart}
        </Button>
      )}
    </div>
  );
}
