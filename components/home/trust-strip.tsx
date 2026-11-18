import { HOME } from "@/contents";
import { Card } from "@/components/ui";

export function TrustStrip() {
  return (
    <ul className="mx-auto grid max-w-5xl gap-3 px-4 py-6 sm:grid-cols-3">
      {HOME.trust.map((item) => (
        <Card key={item.title} as="li" tone="muted" padding="md" className="rounded-xl">
          <p className="font-bold text-ink">{item.title}</p>
          <p className="text-sm text-ink/70">{item.text}</p>
        </Card>
      ))}
    </ul>
  );
}
