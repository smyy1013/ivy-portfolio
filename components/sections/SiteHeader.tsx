import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "#work", label: "Projects" },
  { href: "#how", label: "How I Work" },
  { href: "#contact", label: "Contact" },
];

/** On the home page the logo scrolls to the top; on project pages it links home. */
export function SiteHeader({ home = true }: { home?: boolean }) {
  const logo = (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
      <path d="M10 10L30 30M10 30L30 10" stroke="var(--color-accent)" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="4" fill="var(--color-bg)" stroke="var(--color-accent)" />
    </svg>
  );

  return (
    <header className="relative z-10 flex items-center justify-between gap-6 p-gutter sm:p-gutter-lg">
      {home ? (
        <a href="#top" aria-label={`${site.name}, back to top`}>
          {logo}
        </a>
      ) : (
        <Link href="/" aria-label={`${site.name}, home`} className="flex items-center gap-4">
          {logo}
          <span className="type-label hidden sm:inline">{site.name}</span>
        </Link>
      )}
      <nav
        aria-label="Sections"
        className="type-hud flex flex-wrap justify-end gap-x-4 gap-y-2 text-muted sm:gap-x-7"
      >
        {links.map((link) =>
          home ? (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={`/${link.href}`}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
