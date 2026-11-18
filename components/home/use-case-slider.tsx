"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HOME } from "@/contents";
import { Button } from "@/components/ui";

const { slides, intervalMs } = HOME.useCase;

function scrollToSlide(track: HTMLDivElement, index: number) {
  track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
}

export function UseCaseSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const next = (index + 1) % slides.length;
      scrollToSlide(track, next);
      setIndex(next);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused, index]);

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = (next + slides.length) % slides.length;
    scrollToSlide(track, target);
    setIndex(target);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={HOME.useCase.label}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mx-auto w-full md:max-w-3xl"
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <article
            key={slide.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className="w-full shrink-0 snap-start"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-brand">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 px-1">
              <h3 className="text-lg font-bold text-ink">{slide.title}</h3>
              <p className="text-sm text-ink/70">{slide.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goTo(index - 1)}
          aria-label={HOME.useCase.previous}
        >
          ‹
        </Button>
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={HOME.useCase.slideLabel(i + 1)}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand" : "w-2.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goTo(index + 1)}
          aria-label={HOME.useCase.next}
        >
          ›
        </Button>
      </div>
    </section>
  );
}
