import { CONTACT, BUSINESS } from "@/contents";
import { FacebookIcon, WhatsAppIcon } from "@/components/icons/social-icons";
import { whatsappUrl } from "@/util/whatsapp";

const linkClass = {
  menu: "flex items-center gap-3 px-6 py-3 hover:bg-brand/20",
  footer:
    "flex items-center gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10",
} as const;

const iconClass = {
  menu: "h-6 w-6 shrink-0 text-brand-dark",
  footer: "h-8 w-8 shrink-0 text-brand",
} as const;

const labelClass = {
  menu: "text-base font-medium",
  footer: "font-bold",
} as const;

const detailClass = {
  menu: "text-sm text-zinc-600",
  footer: "text-sm text-zinc-300",
} as const;

type ContactLinksProps = {
  variant: keyof typeof linkClass;
  onNavigate?: () => void;
};

export function ContactLinks({ variant, onNavigate }: ContactLinksProps) {
  const items = [
    {
      href: whatsappUrl(),
      label: CONTACT.whatsappLabel,
      detail: BUSINESS.phoneDisplay,
      Icon: WhatsAppIcon,
    },
    {
      href: BUSINESS.facebookUrl,
      label: CONTACT.facebookLabel,
      detail: BUSINESS.facebookName,
      Icon: FacebookIcon,
    },
  ];

  return (
    <ul
      className={
        variant === "menu"
          ? "flex flex-col border-t border-zinc-200 py-2"
          : "grid gap-3 sm:grid-cols-2"
      }
    >
      {items.map(({ href, label, detail, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className={linkClass[variant]}
          >
            <Icon className={iconClass[variant]} />
            <span className="flex flex-col">
              <span className={labelClass[variant]}>{label}</span>
              <span className={detailClass[variant]}>{detail}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
