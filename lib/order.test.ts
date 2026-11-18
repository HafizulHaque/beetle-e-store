import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/contents";
import { isBdMobile, normalizePhone } from "@/util/phone";
import { EMPTY_FORM, methodsFor, resolveLines, totalOf, validate } from "./order";
import { tierPrice } from "./products";

describe("phone", () => {
  it("accepts local and +880 forms", () => {
    expect(isBdMobile("01712345678")).toBe(true);
    expect(isBdMobile("+880 1712-345678")).toBe(true);
    expect(isBdMobile("8801712345678")).toBe(true);
    expect(normalizePhone("+8801712345678")).toBe("01712345678");
  });

  it("rejects bad numbers", () => {
    expect(isBdMobile("01212345678")).toBe(false);
    expect(isBdMobile("0171234567")).toBe(false);
  });
});

describe("methodsFor", () => {
  it("offers courier only outside local areas, nothing before a district", () => {
    expect(methodsFor("")).toEqual([]);
    expect(methodsFor("ঢাকা")).toEqual(["own_delivery", "courier"]);
    expect(methodsFor("সিলেট")).toEqual(["courier"]);
  });
});

describe("totalOf", () => {
  it("sums price times quantity using the offer price when set", () => {
    const product = PRODUCTS[0];
    const lines = resolveLines([{ slug: product.slug, tier: product.tiers[0].id, qty: 3 }]);
    expect(totalOf(lines)).toBe(tierPrice(product.tiers[0]) * 3);
  });

  it("ignores unknown products and tiers", () => {
    expect(resolveLines([{ slug: "nope", tier: "x", qty: 1 }])).toEqual([]);
  });
});

describe("validate", () => {
  it("flags an empty form and an empty cart", () => {
    const errors = validate(EMPTY_FORM, []);
    expect(Object.keys(errors).sort()).toEqual(["address", "cart", "district", "method", "name", "phone"]);
  });

  it("caps text length", () => {
    const errors = validate({ ...EMPTY_FORM, note: "x".repeat(501) }, []);
    expect(errors.note).toBeDefined();
  });
});
