"use client";

import { NAV, ROUTES } from "@/contents";
import { ButtonLink } from "@/components/ui";
import { useCart } from "@/lib/cart";
import { CartIcon } from "@/components/icons/ui-icons";

export function CartLink() {
  const items = useCart();
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <ButtonLink
      href={ROUTES.order}
      variant="ghost"
      size="icon"
      aria-label={NAV.cartLabel(count)}
      className="relative"
    >
      <CartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-xs font-bold text-brand">
          {count}
        </span>
      )}
    </ButtonLink>
  );
}
