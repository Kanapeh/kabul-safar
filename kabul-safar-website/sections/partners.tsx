"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { FlightSearchForm } from "@/components/flight-search-form";
import { SectionHeading } from "@/components/section-heading";
import { getPartnersTitle, partners } from "@/lib/data";

export const Partners = () => {
  const { lang } = useI18n();

  const labels =
    lang === "en"
      ? { eyebrow: "Flight tickets", title: "Start your trip", subtitle: "Pick your route and date — we'll find the best options and confirm on WhatsApp." }
      : lang === "ps"
        ? { eyebrow: "د الوتکې ټکټ", title: "خپل سفر پیل کړئ", subtitle: "لاره او نېټه وټاکئ؛ موږ غوره انتخابونه پیدا کوو او په واټساپ کې یې تاییدوو." }
        : { eyebrow: "تکت هواپیما", title: "سفر خود را آغاز کنید", subtitle: "مسیر و تاریخ را انتخاب کنید؛ بهترین گزینه‌ها را پیدا کرده و در واتساپ با شما هماهنگ می‌کنیم." };

  return (
    <section
      id="flight-search"
      aria-labelledby="flight-search-form"
      className="ks-card scroll-mt-24 px-4 py-6 md:px-10 md:py-10"
    >
      <SectionHeading
        id="flight-search-form"
        eyebrow={labels.eyebrow}
        title={labels.title}
        subtitle={labels.subtitle}
      />

      <div className="mt-6 w-full">
        <FlightSearchForm />
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-center text-xs font-semibold text-muted md:text-sm">
          {getPartnersTitle(lang)}
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="flex h-14 items-center justify-center rounded-2xl bg-canvas px-4"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={132}
                height={40}
                className="h-6 w-[110px] max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
