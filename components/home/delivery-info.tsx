import { HOME } from "@/contents";

export function DeliveryInfo() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-4 text-2xl font-bold">{HOME.delivery.heading}</h2>
      <ul className="list-disc space-y-2 pl-5 leading-relaxed">
        {HOME.delivery.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
