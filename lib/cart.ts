"use client";

import { useMemo, useSyncExternalStore } from "react";
import { z } from "zod";

const cartItemSchema = z.object({
  slug: z.string(),
  tier: z.string(),
  qty: z.number().int().positive(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

const STORAGE_KEY = "miah-farming-cart";
const CHANGE_EVENT = "miah-cart-change";
const EMPTY = "[]";

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function parse(raw: string): CartItem[] {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  const list = z.array(z.unknown()).safeParse(data);
  if (!list.success) return [];
  return list.data.flatMap((item) => {
    const parsed = cartItemSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}


export function useCart(): CartItem[] {
  const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
  return useMemo(() => parse(raw), [raw]);
}

function writeCart(items: CartItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private mode); the cart simply won't persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function addToCart(slug: string, tier: string, qty = 1): void {
  const items = parse(readRaw());
  const matches = (i: CartItem) => i.slug === slug && i.tier === tier;
  const next = items.some(matches)
    ? items.map((i) => (matches(i) ? { ...i, qty: i.qty + qty } : i))
    : [...items, { slug, tier, qty }];
  writeCart(next);
}

/** Sets a line's quantity; 0 removes the line from the cart. */
export function setCartQty(slug: string, tier: string, qty: number): void {
  const items = parse(readRaw());
  const matches = (i: CartItem) => i.slug === slug && i.tier === tier;
  const next =
    qty > 0
      ? items.some(matches)
        ? items.map((i) => (matches(i) ? { ...i, qty } : i))
        : [...items, { slug, tier, qty }]
      : items.filter((i) => !matches(i));
  writeCart(next);
}
