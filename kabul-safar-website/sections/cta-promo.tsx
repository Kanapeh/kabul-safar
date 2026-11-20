"use client";

import { Phone } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import {
  CONTACT_PHONE_DISPLAY_FORMATTED,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { getCtaContent } from "@/lib/data";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const CtaPromo = () => {
  const { lang } = useI18n();
  const content = getCtaContent(lang);
  const whatsappLabel =
    lang === "en" ? "Message on WhatsApp" : lang === "ps" ? "په واټساپ کې پیغام" : "پیام در واتساپ";

  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden rounded-[28px] bg-navy px-6 py-9 text-center text-white md:rounded-[36px] md:px-12 md:py-12 md:text-start"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-[-4rem] h-64 w-64 rounded-full bg-teal/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 start-[-3rem] h-56 w-56 rounded-full bg-amber/25 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-7 md:flex-row md:justify-between">
        <div className="max-w-[36rem]">
          <h2 id="cta-title" className="text-2xl font-black leading-[1.5] md:text-[32px]">
            {content.visaTitle}
          </h2>
          <p className="mt-2 text-[15px] leading-8 text-white/75 md:text-base">
            {content.visaBody} {content.planBody}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0">
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="ks-btn ks-btn-whatsapp py-4"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {whatsappLabel}
          </a>
          <a
            href={CONTACT_PHONE_TEL}
            className="ks-btn border border-white/20 bg-white/10 py-4 text-white hover:bg-white/15"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span dir="ltr">{CONTACT_PHONE_DISPLAY_FORMATTED}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
