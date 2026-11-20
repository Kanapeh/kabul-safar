"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getFaqContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const Faq = () => {
  const { lang } = useI18n();
  const content = getFaqContent(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const eyebrow = lang === "en" ? "FAQ" : lang === "ps" ? "پوښتنې" : "پرسش و پاسخ";

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="ks-card grid gap-6 px-5 py-7 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:px-10 md:py-10"
    >
      <div className="space-y-5">
        <SectionHeading
          id="faq-title"
          eyebrow={eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />
        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="ks-btn ks-btn-whatsapp hidden md:inline-flex"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {content.cta}
        </a>
      </div>

      <div className="space-y-3">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <article
              key={`${item.question}-${index}`}
              className={`rounded-2xl border transition-colors ${
                isOpen ? "border-teal/30 bg-teal-soft/50" : "border-line bg-white"
              }`}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start text-[15px] font-bold text-ink md:px-5"
                >
                  <span>{item.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen ? "rotate-45 bg-navy text-white" : "bg-canvas text-ink"
                    }`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </h3>
              <div id={answerId} className="ks-collapse" data-open={isOpen}>
                <div>
                  <p className="px-4 pb-4 text-sm leading-7 text-muted md:px-5">{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}

        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="ks-btn ks-btn-whatsapp w-full md:hidden"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {content.cta}
        </a>
      </div>
    </section>
  );
};
