import { HOME, ROUTES } from "@/contents";
import { ButtonLink } from "@/components/ui";
import { whatsappUrl } from "@/util";
import { HeroImage } from "./hero-image";

export function Hero() {
  return (
    <section className="bg-brand">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-[26px] leading-tight font-bold sm:text-4xl">
            {HOME.hero.heading}
          </h1>
          <p className="text-base leading-relaxed sm:text-lg">{HOME.hero.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ROUTES.products} variant="dark" size="lg">
              {HOME.hero.browseLabel}
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              {HOME.hero.whatsappLabel}
            </ButtonLink>
          </div>
        </div>

        <HeroImage />
      </div>
    </section>
  );
}
