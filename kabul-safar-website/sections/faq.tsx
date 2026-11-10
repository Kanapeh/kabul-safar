"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getFaqContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

export const Faq = () => {
  const { lang } = useI18n();
  const content = getFaqContent(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="rounded-[28px] bg-white px-5 py-6 md:px-8 md:py-9">
        <h2
          id="faq-title"
          className="text-right text-xl font-bold text-[#192238] md:text-2xl"
        >
          {content.title}
        </h2>

        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article key={`${item.question}-${index}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-right text-sm font-semibold text-[#192238] md:text-base"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen ? (
                  <p
                    id={answerId}
                    className="pb-4 text-sm leading-6 text-[#64717b]"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>

        <a
          href={CONTACT_WHATSAPP_URL}
          className="mt-5 inline-block text-sm font-semibold text-[#087f99] transition-colors hover:text-[#192238]"
        >
          {content.cta}
        </a>
      </div>
    </section>
  );
};
