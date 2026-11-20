"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { getCtaContent } from "@/lib/data";

export const CtaPromo = () => {
  const { lang } = useI18n();
  const content = getCtaContent(lang);
  const Arrow = lang === "en" ? ArrowRight : ArrowLeft;
  const labels =
    lang === "en"
      ? { plan: "Start on WhatsApp", ask: "Ask a question" }
      : lang === "ps"
        ? { plan: "په واټساپ کې پیل کړئ", ask: "پوښتنه وکړئ" }
        : { plan: "شروع در واتساپ", ask: "سوال خود را بپرسید" };

  const cards = [
    { image: "/images/cta-passport.png", title: content.planTitle, body: content.planBody, action: labels.plan },
    { image: "/images/cta-phone.png", title: content.visaTitle, body: content.visaBody, action: labels.ask },
  ];

  return (
    <section aria-label={content.planTitle} className="grid gap-3 md:grid-cols-2 md:gap-5">
      {cards.map((card) => (
        <a
          key={card.title}
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-[20px] bg-canvas p-5 transition-colors hover:bg-teal-soft md:gap-5 md:p-7"
        >
          <Image
            src={card.image}
            alt=""
            width={88}
            height={88}
            className="h-[72px] w-[72px] shrink-0 rounded-full object-cover md:h-[88px] md:w-[88px]"
          />
          <span className="min-w-0">
            <span className="block text-base font-extrabold text-ink md:text-lg">{card.title}</span>
            <span className="mt-0.5 block text-sm leading-6 text-muted">{card.body}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-navy">
              {card.action}
              <Arrow className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </span>
        </a>
      ))}
    </section>
  );
};
