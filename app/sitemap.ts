import type { MetadataRoute } from "next";
import { PRODUCTS, ROUTES } from "@/contents";
import { productPath } from "@/lib";
import { absoluteUrl } from "@/util/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [ROUTES.home, ROUTES.products];
  const productRoutes = PRODUCTS.map((product) => productPath(product.slug));
  return [...staticRoutes, ...productRoutes].map((path) => ({ url: absoluteUrl(path) }));
}
