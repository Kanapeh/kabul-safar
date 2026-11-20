"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getServiceFeatureContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const ServiceFeature = () => {
  const { lang } = useI18n();
  const content = getServiceFeatureContent(lang);
  const labels =
    lang === "en"
      ? { cta: "Quick visa", eyebrow: "Why Kabul Safar" }
      : lang === "ps"
        ? { cta: "ژر ویزه", eyebrow: "ولې کابل سفر" }
        : { cta: "درخواست ویزای سریع", eyebrow: "چرا کابل سفر" };

  return (
    <section
      aria-labelledby="service-feature-title"
      className="grid items-center gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10"
    >
      <div className="relative h-56 overflow-hidden rounded-[24px] md:h-[360px]">
        <Image
          src="/images/bamiyan.jpg"
          alt={lang === "en" ? "Buddhas of Bamiyan" : "بت‌های بامیان"}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      </div>

      <div className="text-start">
        <span className="ks-eyebrow">{labels.eyebrow}</span>
        <h2
          id="service-feature-title"
          className="mt-3 text-[22px] font-extrabold leading-[1.5] text-ink md:text-[32px]"
        >
          {content.titlePrefix} <span className="text-teal">{content.titleAccent}</span>{" "}
          {content.titleSuffix}
        </h2>
        <p className="mt-3 text-[15px] leading-8 text-muted md:text-base md:leading-9">
          {content.body}
        </p>
        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="ks-btn ks-btn-primary mt-5 w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {labels.cta}
        </a>
      </div>
    </section>
  );
};
