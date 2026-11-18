import { z } from "zod";
import {
  BUSINESS,
  DELIVERY_METHODS,
  ORDER_FORM,
  ORDER_MESSAGE,
  type DeliveryMethod,
} from "@/contents";
import { formatBdt, isBdMobile, normalizePhone } from "@/util";
import type { CartItem } from "./cart";
import { getProduct, getTier, tierPrice } from "./products";
import type { PriceTier, Product } from "./types";

export const DISTRICTS: string[] = [...BUSINESS.localAreas, ORDER_FORM.otherDistrict];

const LOCAL_METHODS: DeliveryMethod[] = ["own_delivery", "courier"];
const OTHER_DISTRICT_METHODS: DeliveryMethod[] = ["courier"];

export type Line = { product: Product; tier: PriceTier; qty: number };

export type FormState = {
  name: string;
  phone: string;
  address: string;
  district: string;
  method: DeliveryMethod | "";
  note: string;
};

export type FormErrors = Partial<Record<keyof FormState | "cart", string>>;

export const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  address: "",
  district: "",
  method: "",
  note: "",
};

export function methodsFor(district: string): DeliveryMethod[] {
  if ((BUSINESS.localAreas as readonly string[]).includes(district)) return LOCAL_METHODS;
  return district ? OTHER_DISTRICT_METHODS : [];
}

const deliveryMethodKeys = Object.keys(DELIVERY_METHODS) as [DeliveryMethod, ...DeliveryMethod[]];

export const orderFormSchema = z
  .object({
    name: z.string().trim().min(2, ORDER_FORM.errors.name).max(100, ORDER_FORM.errors.name),
    phone: z.string().refine(isBdMobile, ORDER_FORM.errors.phone),
    address: z.string().trim().min(5, ORDER_FORM.errors.address).max(300, ORDER_FORM.errors.address),
    district: z.string().refine((d) => DISTRICTS.includes(d), ORDER_FORM.errors.district),
    method: z.enum(deliveryMethodKeys, { error: ORDER_FORM.errors.method }),
    note: z.string().max(500, ORDER_FORM.errors.note),
  })
  .superRefine((form, ctx) => {
    if (!methodsFor(form.district).includes(form.method)) {
      ctx.addIssue({
        code: "custom",
        path: ["method"],
        message: ORDER_FORM.errors.method,
        input: form.method,
      });
    }
  });

export function resolveLines(items: CartItem[]): Line[] {
  return items.flatMap((item) => {
    const product = getProduct(item.slug);
    const tier = product ? getTier(product, item.tier) : undefined;
    return product && tier ? [{ product, tier, qty: item.qty }] : [];
  });
}

export function totalOf(lines: Line[]): number {
  return lines.reduce((sum, l) => sum + tierPrice(l.tier) * l.qty, 0);
}

export function validate(form: FormState, lines: Line[]): FormErrors {
  const errors: FormErrors = {};
  const result = orderFormSchema.safeParse(form);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormState;
      errors[key] ??= issue.message;
    }
  }
  if (lines.length === 0) errors.cart = ORDER_FORM.errors.cart;
  return errors;
}

export function buildMessage(form: FormState, lines: Line[]): string {
  const items = lines.map((l) =>
    ORDER_MESSAGE.itemLine(
      l.product.name,
      l.tier.label,
      l.qty,
      formatBdt(tierPrice(l.tier) * l.qty),
    ),
  );
  return [
    ORDER_MESSAGE.title,
    "",
    `${ORDER_MESSAGE.name}: ${form.name.trim()}`,
    `${ORDER_MESSAGE.phone}: ${normalizePhone(form.phone)}`,
    `${ORDER_MESSAGE.address}: ${form.address.trim()}`,
    `${ORDER_MESSAGE.district}: ${form.district}`,
    `${ORDER_MESSAGE.delivery}: ${form.method ? DELIVERY_METHODS[form.method] : ""}`,
    "",
    ORDER_MESSAGE.items,
    ...items,
    "",
    ORDER_MESSAGE.total(formatBdt(totalOf(lines))),
    ORDER_MESSAGE.payment,
    ...(form.note.trim() ? [ORDER_MESSAGE.note(form.note.trim())] : []),
  ].join("\n");
}
