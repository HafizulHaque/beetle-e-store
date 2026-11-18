"use client";

import { useState, type FormEvent } from "react";
import {
  DELIVERY_METHODS,
  ORDER_FORM,
  PURCHASE,
  ROUTES,
  type DeliveryMethod,
} from "@/contents";
import { Button, ButtonLink, Card, FormField, Input, Select, Textarea } from "@/components/ui";
import { setCartQty, useCart } from "@/lib/cart";
import {
  buildMessage,
  DISTRICTS,
  EMPTY_FORM,
  methodsFor,
  resolveLines,
  totalOf,
  validate,
  type FormErrors,
  type FormState,
} from "@/lib/order";
import { tierPrice } from "@/lib/products";
import { formatBdt } from "@/util/format";
import { whatsappUrl } from "@/util/whatsapp";

export function OrderForm() {
  const items = useCart();
  const lines = resolveLines(items);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const errors: FormErrors = submitted ? validate(form, lines) : {};

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(form, lines)).length > 0) return;
    window.location.assign(whatsappUrl(buildMessage(form, lines)));
  }

  if (lines.length === 0) {
    return (
      <Card tone="muted" padding="lg">
        <p className="font-medium">{ORDER_FORM.cartEmpty}</p>
        <ButtonLink href={ROUTES.products} size="lg" className="mt-4">
          {ORDER_FORM.browseProducts}
        </ButtonLink>
      </Card>
    );
  }

  const methods = methodsFor(form.district);
  const total = totalOf(lines);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8     md:grid-cols-5 md:items-start">
          <section aria-labelledby="details-heading" className="flex flex-col gap-3 md:col-span-3">
        <h2 id="details-heading" className="text-xl font-bold">
          {ORDER_FORM.detailsHeading}
        </h2>

        <FormField label={ORDER_FORM.fields.name} error={errors.name}>
          <Input
            name="name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </FormField>

        <FormField label={ORDER_FORM.fields.phone} error={errors.phone}>
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={ORDER_FORM.fields.phonePlaceholder}
            invalid={Boolean(errors.phone)}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </FormField>

        <FormField label={ORDER_FORM.fields.address} error={errors.address}>
          <Textarea
            name="address"
            rows={3}
            autoComplete="street-address"
            invalid={Boolean(errors.address)}
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </FormField>

        <FormField label={ORDER_FORM.fields.district} error={errors.district}>
          <Select
            name="district"
            invalid={Boolean(errors.district)}
            value={form.district}
            onChange={(e) => {
              const district = e.target.value;
              const allowed = methodsFor(district);
              setForm((prev) => ({
                ...prev,
                district,
                method:
                  prev.method !== "" && allowed.includes(prev.method)
                    ? prev.method
                    : "",
              }));
            }}
          >
            <option value="">{ORDER_FORM.fields.districtPlaceholder}</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </FormField>

        <fieldset className="flex flex-col gap-1.5">
                  <legend className="mb-1 ml-1 text-sm font-bold">{ORDER_FORM.fields.method}</legend>
          {form.district === "" && (
            <p className="text-sm text-zinc-600">{ORDER_FORM.fields.methodHint}</p>
          )}
          {methods.map((m: DeliveryMethod) => (
            <label
              key={m}
              className="flex min-h-11 items-center gap-3 rounded-xl p-2.5 ring-1 ring-black/15 has-checked:bg-brand has-checked:ring-2 has-checked:ring-ink"
            >
              <input
                type="radio"
                name="method"
                value={m}
                checked={form.method === m}
                onChange={() => update("method", m)}
                className="h-5 w-5 accent-ink"
              />
              {DELIVERY_METHODS[m]}
            </label>
          ))}
          {errors.method && (
            <p className="text-sm text-red-700">{errors.method}</p>
          )}
        </fieldset>

        <FormField label={ORDER_FORM.fields.note} error={errors.note}>
          <Textarea
            name="note"
            rows={2}
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
          />
        </FormField>
      </section>

      <div className="flex flex-col gap-4 md:col-span-2">
        <Card tone="outline" padding="md" className="flex flex-col gap-4 rounded-2xl shadow-sm">
          <section aria-label={ORDER_FORM.cartHeading} className="flex flex-col gap-3">
            <ul className="flex flex-col gap-3">
              {lines.map(({ product, tier, qty }) => (
                <Card
                  as="li"
                  key={`${product.slug}-${tier.id}`}
                  tone="outline"
                  padding="sm"
                  className="flex items-center justify-between gap-3 rounded-xl"
                >
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-zinc-600">
                      {tier.label} · {formatBdt(tierPrice(tier))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="soft"
                      size="icon"
                      aria-label={PURCHASE.decrease(product.name)}
                      onClick={() => setCartQty(product.slug, tier.id, qty - 1)}
                      className="rounded-md shadow-md"
                    >
                      −
                    </Button>
                    <span className="w-8 text-center font-bold" aria-live="polite">
                      {qty}
                    </span>
                    <Button
                      size="icon"
                      aria-label={PURCHASE.increase(product.name)}
                      onClick={() => setCartQty(product.slug, tier.id, qty + 1)}
                      className="rounded-md shadow-md"
                    >
                      +
                    </Button>
                  </div>
                </Card>
              ))}
            </ul>
            <p className="text-lg font-bold">
              {ORDER_FORM.totalLabel}: {formatBdt(total)}
            </p>
            <p className="text-sm text-zinc-600">{ORDER_FORM.chargeNote}</p>
            {errors.cart && <p className="text-sm text-red-700">{errors.cart}</p>}
          </section>

          <p className="rounded-xl bg-zinc-100 p-3 text-sm">{ORDER_FORM.paymentNotice}</p>
        </Card>

        <Button type="submit" size="lg" className="min-h-14 text-lg">
          {ORDER_FORM.submit}
        </Button>
      </div>
    </form>
  );
}

