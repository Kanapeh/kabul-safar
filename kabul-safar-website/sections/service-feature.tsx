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
      ? { cta: "Quick visa" }
      : lang === "ps"
        ? { cta: "ژر ویزه" }
        : { cta: "درخواست ویزای سریع" };

  return (
    <section
      aria-labelledby="service-feature-title"
      className="grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-12"
    >
      <div className="relative order-first h-56 overflow-hidden rounded-[20px] md:order-last md:h-[400px]">
        <Image
          src="/images/bamiyan.jpg"
          alt={lang === "en" ? "Buddhas of Bamiyan" : "بت‌های بامیان"}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      </div>

      <div className="text-start">
        <h2
          id="service-feature-title"
          className="text-[26px] font-black leading-[1.5] text-ink md:text-[40px] md:leading-[1.4]"
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
