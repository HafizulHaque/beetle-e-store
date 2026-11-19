# Copilot instructions for beetle-shop

## Commands

Package manager is pnpm (`packageManager` in `package.json`, lockfile `pnpm-lock.yaml`). On Windows PowerShell, `pnpm.ps1` may be blocked by execution policy; use `pnpm.cmd` instead.

- Dev server: `pnpm dev` (http://localhost:3000)
- Build: `pnpm build`; serve the build with `pnpm start`
- Lint: `pnpm lint` (ESLint flat config in `eslint.config.mjs`). Single file: `pnpm exec eslint app/page.tsx`
- Typecheck: `pnpm exec tsc --noEmit` (no script defined for this)
- Tests: none. There is no test runner or test files, so do not look for a single-test command.
- UI verification: the Playwright MCP server is configured in `.vscode/mcp.json`. For visual or interactive changes, start `pnpm dev` and check http://localhost:3000 with it.

## Product

Miah Farming: a Bangla-language storefront selling live beetle larvae and mother insects (food for birds, fish, and reptiles). Mobile-first, yellow/black theme, SEO-focused. There is no backend, database, or payment gateway. Orders are cash on delivery and are handed off to the seller via a prefilled `wa.me` WhatsApp link.

## Architecture

- Next.js 16.4 App Router with React 19. Routes: `/` (home), `/products` (list), `/products/[slug]` (detail, statically generated from `PRODUCTS`), `/order` (COD order form), plus `app/sitemap.ts` and `app/robots.ts`.
- `app/layout.tsx` sets `lang="bn"`, loads `Noto Sans Bengali` via `next/font/google` (exposed as `--font-bengali`), sets metadata, and renders `SiteHeader`, the page, and `FloatingWhatsApp`.
- All user-facing copy and static data live in `contents/` (one file per area, e.g. `business.ts`, `products.ts`, `home.ts`, `order.ts`, `seo.ts`). Pages and components must not hardcode text; read it from `@/contents`.
  - `business.ts` holds `BUSINESS` (shop name, WhatsApp number, service areas). `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, defaults to localhost) lives in `util/url.ts`.
  - `products.ts` holds `PRODUCTS`, the product catalog (Beetle Larvae sold by gram, Beetle Mother sold by piece). Each product's `tiers` follow `PriceTier` in `lib/types.ts`.
- `lib/` holds domain logic and data helpers: `products.ts` (`getProduct`, `productPath`, `getTier`, `tierPrice`, `perPieceText`), `order.ts` (zod `orderFormSchema`, `validate()`, delivery rules by district, the Bangla order message), `structured-data.ts` (JSON-LD builders), and `types.ts`. `cart.ts` (`"use client"`) is the localStorage cart (`miah-farming-cart`) of `{slug, tier, qty}` lines using `useSyncExternalStore`. Its `cartItemSchema` (zod) validates stored lines and drops invalid ones.
- `util/` holds shared, reusable helpers: `cn.ts` (`cn`, clsx + tailwind-merge), `format.ts` (`formatBdt`), `phone.ts` (`isBdMobile`), `url.ts` (`SITE_URL`, `absoluteUrl`), `whatsapp.ts` (`whatsappUrl`), `json-ld.ts`, and `metadata.ts` (`pageMetadata`).
- `components/ui/` is the reusable design kit, built like shadcn with `class-variance-authority` variants: `Button` / `ButtonLink` (`buttonVariants`: primary, secondary, dark, soft, ghost, outline, muted; sizes md, lg, icon, stepper), `Card` (`cardVariants`: tone, padding, interactive), `Input` / `Textarea` / `Select` (`fieldVariants`, with an `invalid` flag), and `FormField` (label plus error message). Use these instead of hand-writing button, card, or field classes. Extend a variant in `buttonVariants` / `cardVariants` rather than adding one-off class strings.
- Components are in `components/`, grouped by feature (`layout/`, `home/`, `products/`, `order/`, `icons/`, `seo/`). `products/product-purchase.tsx` (client) holds the tier picker and add-to-cart button, used by `product-card.tsx` and the detail page. `order/order-form.tsx` (client) holds the checkout form.
- Every folder under `lib/`, `util/`, `contents/`, and `components/` has an `index.ts` barrel. Import from the barrel (`@/components/home`, `@/contents`, `@/util`) from outside the folder. Files inside the same folder import each other directly (e.g. `./contact-links`) to avoid circular imports.
- Styling is Tailwind CSS v4. `app/globals.css` defines the brand palette (`--color-brand` yellow, `--color-ink` black) via `@theme inline`, so classes like `bg-brand` and `text-ink` work. `next.config.ts` wires `@tailwindcss/turbopack` as a Turbopack CSS loader.
- `next.config.ts` enables several non-default features that shape how code should be written:
  - `output: "export"` (static export): Cache Components is not supported with static export in Next 16.4.6, so `cacheComponents` and `partialPrefetching` are off. Pages are prerendered at build time, and `app/robots.ts` and `app/sitemap.ts` use `export const dynamic = "force-static"`. Do not add `"use cache"` or `cacheComponents`-only features.
  - `experimental.agentUpgrade: "security"`.
- Static assets live in `public/`, referenced by absolute path (e.g. `/images/superworm.jpg`).
- The home page has a use-case slider (`components/home/use-case-slider.tsx`, autoplay interval from `HOME.useCase.intervalMs`). Its slides are JPEG images in `public/images/slides/` (SEO-named, e.g. `fish-aquarium-live-food.jpg`), listed in `HOME.useCase.slides` in `contents/home.ts`. Add new slides by adding an image there and a matching entry.
- `components/home/trust-strip.tsx` shows the organic, home-grown, and quality messages on the home page.
- SEO: page titles and descriptions come from `SEO` in `contents/seo.ts`, and per-page metadata is built with `pageMetadata` from `util/metadata.ts`. Root metadata lives in `app/layout.tsx`.

## Next.js version caveats

This is Next.js 16, which differs from older training data. `AGENTS.md` requires reading the matching guide in `node_modules/next/dist/docs/` before writing Next.js code, and heeding deprecation notices there. Examples:

- Request interception uses `proxy.ts`, not `middleware.ts` (see `01-app/01-getting-started/16-proxy.md`).
- Layout props are typed with the global `LayoutProps<"/">` helper, as in `app/layout.tsx`.

The `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` is managed by `next dev`. Keep it when editing `AGENTS.md`; add other agent notes outside that block.

## Conventions

- Import alias `@/*` maps to the project root (see `tsconfig.json`).
- Use `next/image` for images, rather than plain `<img>`.
- Validate untrusted input (the order form, stored cart data) with zod schemas in `lib/`. Show field errors through `FormField` and the `invalid` flag on `Input` / `Textarea` / `Select`.
- Components are named exports in `components/**` and are imported through their folder barrel. Only `app/` route files (`page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`) use default exports, as Next.js requires. Components are Server Components unless a file opts in with `"use client"`.
- The site is light-only, with yellow (`brand`) and black (`ink`) as the primary colors. Do not add dark-mode variants or a theme library.
- User-facing text is Bangla. Keep prices and numbers in English digits.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap, and JSON-LD use the real domain.
- The TypeScript config is `strict`. Run `pnpm exec tsc --noEmit` and `pnpm lint` before finishing a change.
