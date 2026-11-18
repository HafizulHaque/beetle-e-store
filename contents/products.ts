import type { Product, WholesaleOffer } from "@/lib/types";

export const PIECE_UNIT = "পিস";

const WHOLESALE_OFFER: WholesaleOffer = {
  text: "বেশি কিনলে বিশেষ ছাড়! পাইকারি ছাড়ের জন্য হোয়াটসঅ্যাপে জানান।",
  whatsappPhrase: "হোয়াটসঅ্যাপে",
};

export const PRODUCTS: Product[] = [
  {
    slug: "beetle-larvae",
    name: "বিটল লার্ভা (সুপারওয়ার্ম)",
    nameEn: "Beetle Larvae (Superworm)",
    description:
      "অর্গানিক পদ্ধতিতে, নিজস্ব খামারে তৈরি ভালো মানের লাইভ সুপারওয়ার্ম। ফ্রেশ অবস্থায় পাঠানো হয়।",
    unit: "গ্রাম",
    tiers: [
      { id: "250g", quantity: 250, priceBdt: 350, label: "২৫০ গ্রাম" },
      {
        id: "500g",
        quantity: 500,
        priceBdt: 700,
        offerPriceBdt: 600,
        label: "৫০০ গ্রাম",
      },
      {
        id: "1kg",
        quantity: 1000,
        priceBdt: 1400,
        offerPriceBdt: 1150,
        label: "১ কেজি",
      },
    ],
    wholesaleOffer: WHOLESALE_OFFER,
    usage: [
      "আকোয়ারিয়াম মাছ: লাইভ সুপারওয়ার্ম মাছের প্রিয় খাবার",
      "পাখি: ময়ূর, মুরগি ও অন্যান্য পোষা পাখির জন্য",
      "সরীসৃপ: টিকটিকি ও অন্যান্য সরীসৃপের জন্য",
    ],
    relatedSlug: "beetle-mother",
    image: "/images/superworm.jpg",
    imageAlt: "বিটল লার্ভা (সুপারওয়ার্ম) - লাইভ খাবার",
    inStock: true,
  },
  {
    slug: "beetle-mother",
    relatedSlug: "beetle-larvae",
    name: "বিটল মাদার পোকা",
    nameEn: "Beetle Mother",
    description:
      "নিজে সুপারওয়ার্ম উৎপাদন করতে চাইলে এই মাদার পোকা দিয়ে শুরু করুন।",
    unit: PIECE_UNIT,
    tiers: [
      { id: "100", quantity: 100, priceBdt: 400, label: "১০০ পিস" },
      {
        id: "250",
        quantity: 250,
        priceBdt: 1000,
        offerPriceBdt: 875,
        label: "২৫০ পিস",
      },
      {
        id: "500",
        quantity: 500,
        priceBdt: 2000,
        offerPriceBdt: 1600,
        label: "৫০০ পিস",
      },
      {
        id: "1000",
        quantity: 1000,
        priceBdt: 4000,
        offerPriceBdt: 3000,
        label: "১০০০ পিস",
      },
    ],
    wholesaleOffer: WHOLESALE_OFFER,
    usage: [
      "নিজের সুপারওয়ার্ম চাষের জন্য প্রজনন স্টক",
      "বারবার লাভ: এক বার কিনে নিজেই লার্ভা উৎপাদন করুন",
      "বড় পরিমাণে কিনলে প্রতি পিসে কম দাম",
    ],
    image: "/images/beetle-mother.jpg",
    imageAlt: "বিটল মাদার পোকা - ব্রিডিং স্টক",
    inStock: true,
  },
];
