import { DeliveryInfo, Hero, OrderSteps, ProductHighlights, TrustStrip, UseCase } from "@/components/home";
import { JsonLd } from "@/components/seo";
import { ROUTES, SEO } from "@/contents";
import { localBusinessSchema } from "@/lib";
import { pageMetadata } from "@/util/metadata";

export const metadata = pageMetadata({
  title: SEO.home.title,
  description: SEO.home.description,
  path: ROUTES.home,
});

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <UseCase />
      <TrustStrip />
      <ProductHighlights />
      <OrderSteps />
      <DeliveryInfo />
    </main>
  );
}
