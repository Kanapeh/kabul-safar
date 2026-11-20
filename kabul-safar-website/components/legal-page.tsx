"use client";

import { FileText } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

type LegalContent = {
  title: string;
  description: string;
  sections: { title: string; content: string }[];
};

const LAST_UPDATED = "2026-11-21";

/** Shared layout for Privacy & Terms: hero, sticky table of contents, numbered sections. */
export function LegalPage({ content }: { content: LegalContent }) {
  const { lang } = useI18n();
  const toDigits = (n: number) => (lang === "en" ? String(n) : n.toLocaleString("fa-IR"));
  const ui =
    lang === "en"
      ? { eyebrow: "Legal", toc: "Contents", updated: "Last updated", question: "Questions? Ask us on WhatsApp" }
      : lang === "ps"
        ? { eyebrow: "حقوقي", toc: "منځپانګه", updated: "وروستی تازه", question: "پوښتنه لرئ؟ په واټساپ کې یې وپوښتئ" }
        : { eyebrow: "اسناد حقوقی", toc: "فهرست مطالب", updated: "آخرین به‌روزرسانی", question: "سوالی دارید؟ در واتساپ بپرسید" };

  const updated = new Date(LAST_UPDATED).toLocaleDateString(lang === "en" ? "en-GB" : "fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageShell>
      <PageHero
        eyebrow={ui.eyebrow}
        eyebrowIcon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
        title={content.title}
        subtitle={
          <>
            {content.description}
            <span className="mt-2 block text-sm">
              {ui.updated}: {updated}
            </span>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label={ui.toc} className="ks-card h-fit p-4 lg:sticky lg:top-28">
          <p className="px-2 text-xs font-bold text-muted">{ui.toc}</p>
          <ol className="mt-2 space-y-0.5">
            {content.sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#section-${index + 1}`}
                  className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-canvas hover:text-ink"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-soft text-xs font-bold text-teal">
                    {toDigits(index + 1)}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="ks-card divide-y divide-line">
          {content.sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-28 p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-lg font-extrabold text-ink md:text-xl">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white">
                  {toDigits(index + 1)}
                </span>
                {section.title}
              </h2>
              <p className="mt-3 text-[15px] leading-8 text-ink/80">{section.content}</p>
            </section>
          ))}
          <div className="p-6 md:p-8">
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" className="ks-btn ks-btn-whatsapp">
              <WhatsAppIcon className="h-5 w-5" />
              {ui.question}
            </a>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
