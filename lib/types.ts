export type PriceTier = {
  id: string;
  /** Number of units in the pack (pieces or grams). */
  quantity: number;
  priceBdt: number;
  /** Discounted price. When set, `priceBdt` is shown struck through. */
  offerPriceBdt?: number;
  label: string;
};

export type WholesaleOffer = {
  /** Offer sentence shown under the tier picker and on the detail page. */
  text: string;
  /** Part of `text` that links to WhatsApp. Must appear in `text`. */
  whatsappPhrase: string;
};

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  /** Unit of quantity, e.g. "পিস" or "গ্রাম". */
  unit: string;
  tiers: PriceTier[];
  wholesaleOffer: WholesaleOffer;
  /** Short bullet points on how the product is used. */
  usage: string[];
  /** Product that complements this one, e.g. breeding stock for larvae. */
  relatedSlug?: string;
  image: string;
  imageAlt: string;
  inStock: boolean;
};
