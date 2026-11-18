import { BUSINESS, DELIVERY_CHARGE_NOTE, PAYMENT_METHOD } from "./business";

export const ORDER_PAGE = {
  heading: "অর্ডার করুন",
  intro: "ফর্ম পূরণ করে অর্ডার পাঠালে আমাদের হোয়াটসঅ্যাপে মেসেজ চলে যাবে।",
};

export const DELIVERY_METHODS = {
  own_delivery: "নিজস্ব লোকের মাধ্যমে ডেলিভারি",
  courier: "স্টেডফাস্ট কুরিয়ার",
} as const;

export type DeliveryMethod = keyof typeof DELIVERY_METHODS;

export const ORDER_FORM = {
  otherDistrict: "অন্য জেলা",
  cartEmpty: "আপনার অর্ডারে এখনো কোনো পণ্য নেই।",
  browseProducts: "পণ্য দেখুন",
  cartHeading: "আপনার অর্ডার",
  detailsHeading: "আপনার তথ্য",
  totalLabel: "আনুমানিক মোট",
  chargeNote: DELIVERY_CHARGE_NOTE,
  paymentNotice: `পেমেন্ট: শুধু ${PAYMENT_METHOD}। পণ্য হাতে পেয়ে টাকা দিন।`,
  fields: {
    name: "নাম",
    phone: "মোবাইল নম্বর",
    phonePlaceholder: "017XXXXXXXX",
    address: "পূর্ণ ঠিকানা",
    district: "জেলা",
    districtPlaceholder: "জেলা বেছে নিন",
    method: "ডেলিভারির ধরন",
    methodHint: "প্রথমে জেলা বেছে নিন।",
    note: "নোট (ঐচ্ছিক)",
  },
  errors: {
    name: "আপনার নাম লিখুন",
    phone: "সঠিক মোবাইল নম্বর লিখুন (যেমন 017XXXXXXXX)",
    address: "পূর্ণ ঠিকানা লিখুন",
    district: "জেলা বেছে নিন",
    method: "ডেলিভারির ধরন বেছে নিন",
    note: "নোট ৫০০ অক্ষরের মধ্যে লিখুন",
    cart: "অর্ডারে কোনো পণ্য নেই",
  },
  submit: "অর্ডার পাঠান",
  copy: "অর্ডার বার্তা কপি করুন",
  copied: "অর্ডার বার্তা কপি হয়েছে",
};

export const ORDER_MESSAGE = {
  title: `নতুন অর্ডার - ${BUSINESS.name}`,
  name: "নাম",
  phone: "মোবাইল",
  address: "ঠিকানা",
  district: "জেলা",
  delivery: "ডেলিভারি",
  items: "পণ্য:",
  itemLine: (name: string, label: string, qty: number, amount: string) =>
    `- ${name} (${label}) × ${qty} = ${amount}`,
  total: (amount: string) => `আনুমানিক মোট: ${amount} (ডেলিভারি চার্জ আলাদা)`,
  payment: `পেমেন্ট: ${PAYMENT_METHOD}`,
  note: (text: string) => `নোট: ${text}`,
};
