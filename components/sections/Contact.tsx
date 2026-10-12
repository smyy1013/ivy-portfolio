import { BracketFrame, Button, ContactMenu, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { getCopy } from "@/lib/copy";

export function Contact() {
  const { contact } = getCopy();

  return (
    <section
      id="contact"
      aria-label={contact.title}
      className="relative z-[5] border-t border-line px-gutter py-20 sm:px-gutter-lg lg:pb-[140px] lg:pt-[120px]"
    >
      <BracketFrame className="mx-auto max-w-frame px-6 py-14 text-center sm:px-[60px] sm:py-20">
        <h2 className="type-title mb-8">{contact.headline}</h2>
        {contact.paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-mono-body mx-auto mb-12 max-w-[640px] text-muted">
            <RichText text={paragraph} />
          </p>
        ))}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="#work" className="justify-center sm:justify-start">
            {contact.primary}
          </Button>
          <ContactMenu
            label={contact.secondary}
            email={site.email}
            linkedin={site.linkedin}
            className="justify-center sm:justify-start"
          />
        </div>
      </BracketFrame>

      <footer className="type-hud mx-auto mt-10 flex max-w-frame flex-col items-center justify-between gap-3 tracking-normal text-dim sm:flex-row">
        <span>{site.name}</span>
        <span className="flex gap-6">
          <a href={`mailto:${site.email}`} className="normal-case transition-colors hover:text-accent">
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </span>
      </footer>
    </section>
  );
}
