export const ROUTES = {
  home: "/",
  products: "/products",
  order: "/order",
} as const;

export const NAV = {
  links: [
    { href: ROUTES.products, label: "পণ্যসমূহ" },
    { href: ROUTES.order, label: "অর্ডার" },
  ],
  desktopLabel: "ডেস্কটপ মেনু",
  mainLabel: "প্রধান মেনু",
  openMenu: "মেনু খুলুন",
  closeMenu: "মেনু বন্ধ করুন",
  cartLabel: (count: number) => `কার্ট, ${count}টি পণ্য`,
};
