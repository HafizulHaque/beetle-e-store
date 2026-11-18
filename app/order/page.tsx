import { OrderForm, OrderIntro } from "@/components/order";
import { ROUTES, SEO } from "@/contents";
import { pageMetadata } from "@/util/metadata";

export const metadata = pageMetadata({
  title: SEO.order.title,
  description: SEO.order.description,
  path: ROUTES.order,
  noindex: true,
});

export default function OrderPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <OrderIntro />
      <div className="mt-8">
        <OrderForm />
      </div>
    </main>
  );
}
