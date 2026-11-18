import { HOME } from "@/contents";
import { Card } from "@/components/ui";

export function OrderSteps() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold">{HOME.steps.heading}</h2>
        <ol className="grid gap-3 sm:grid-cols-4">
          {HOME.steps.items.map((step, index) => (
            <Card
              key={step}
              as="li"
              tone="outline"
              padding="md"
              className="flex items-center gap-3 rounded-xl"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-bold">
                {index + 1}
              </span>
              <span className="font-medium">{step}</span>
            </Card>
          ))}
        </ol>
      </div>
    </section>
  );
}
