import { BUSINESS, CONTACT, DEVELOPER, FOOTER } from "@/contents";
import { ContactLinks } from "./contact-links";

async function getCopyrightYear() {
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCopyrightYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold text-brand">{BUSINESS.name}</p>
          <p className="text-sm leading-relaxed text-zinc-300">
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{CONTACT.heading}</h2>
          <ContactLinks variant="footer" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pt-4 pb-24 text-sm text-zinc-300 md:flex-row md:items-center md:justify-between md:pb-4">
          <p>{FOOTER.copyright(year, BUSINESS.name)}</p>
          <p>
            {FOOTER.developedBy}{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand underline-offset-4 hover:underline"
            >
              {DEVELOPER.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
