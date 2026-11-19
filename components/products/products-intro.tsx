import Image from "next/image";
import { PRODUCTS_PAGE } from "@/contents";

export function ProductsIntro() {
  return (
    <header>
      <h1 className="text-3xl font-bold">{PRODUCTS_PAGE.heading}</h1>
      <div className="mt-2 text-zinc-700">
        <p>{PRODUCTS_PAGE.intro}</p>
        <div className="mt-4 flex w-fit items-center gap-3 font-bold text-brand">
          <Image
            src={PRODUCTS_PAGE.offerImage}
            alt=""
            width={80}
            height={80}
            unoptimized
            className="h-20 w-20 shrink-0 object-contain"
          />
          <span className="text-lg">{PRODUCTS_PAGE.offer}</span>
        </div>
      </div>
    </header>
  );
}
