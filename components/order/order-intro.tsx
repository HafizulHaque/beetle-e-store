import { ORDER_PAGE } from "@/contents";

export function OrderIntro() {
  return (
    <header>
      <h1 className="text-3xl font-bold">{ORDER_PAGE.heading}</h1>
      <p className="mt-2 text-zinc-700">{ORDER_PAGE.intro}</p>
    </header>
  );
}
