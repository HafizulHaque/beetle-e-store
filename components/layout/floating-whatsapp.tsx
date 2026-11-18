import { FLOATING_WHATSAPP } from "@/contents";
import { ButtonLink } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons/social-icons";
import { whatsappUrl } from "@/util/whatsapp";

export function FloatingWhatsApp() {
  return (
    <ButtonLink
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={FLOATING_WHATSAPP.label}
      className="fixed right-4 bottom-4 z-50 min-h-0 gap-2 px-4 py-3 text-sm shadow-lg hover:scale-105"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span>{FLOATING_WHATSAPP.text}</span>
    </ButtonLink>
  );
}
