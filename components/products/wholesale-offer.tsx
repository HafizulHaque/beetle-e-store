import { whatsappUrl } from "@/util/whatsapp";
import type { WholesaleOffer as WholesaleOfferContent } from "@/lib/types";

type WholesaleOfferProps = {
  offer: WholesaleOfferContent;
  className?: string;
};

export function WholesaleOffer({ offer, className }: WholesaleOfferProps) {
  const { text, whatsappPhrase } = offer;
  const start = text.indexOf(whatsappPhrase);
  if (start === -1) return <p className={className}>{text}</p>;

  const end = start + whatsappPhrase.length;
  return (
    <p className={className}>
      {text.slice(0, start)}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-brand-dark underline underline-offset-4"
      >
        {whatsappPhrase}
      </a>
      {text.slice(end)}
    </p>
  );
}
