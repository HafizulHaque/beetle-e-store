import { HOME } from "@/contents";
import { UseCaseSlider } from "./use-case-slider";

export function UseCase() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold">{HOME.useCase.heading}</h2>
      <UseCaseSlider />
    </section>
  );
}
