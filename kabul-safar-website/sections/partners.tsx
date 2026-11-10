"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { FlightSearchForm } from "@/components/flight-search-form";
import { getPartnersTitle, partners } from "@/lib/data";

export const Partners = () => {
  const { lang } = useI18n();

  return (
    <section
      aria-label={
        lang === "fa"
          ? "ایرلاین‌ها"
          : lang === "ps"
            ? "هوايي شرکتونه"
            : "Airline brands"
      }
      className="rounded-[28px] bg-white px-5 py-6 shadow-[0_10px_32px_-28px_rgba(25,34,56,0.34)] md:px-8 md:py-8"
    >
      <h2 className="text-center text-sm font-semibold text-[#64717b] md:text-base">
        {getPartnersTitle(lang)}
      </h2>

      {/* Airline logos (show under title) */}
      <div className="mt-4 grid w-full grid-cols-2 gap-3 px-2 md:mt-6 md:grid-cols-4 md:gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex h-16 items-center justify-center rounded-xl border border-slate-200 px-4 md:h-20"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={132}
              height={40}
              className="h-7 w-[116px] max-w-full object-contain grayscale brightness-0"
            />
          </div>
        ))}
      </div>

      {/* Search header */}
      <h3
        id="flight-search-form"
        className="mt-6 text-center text-xl font-bold text-[#192238] md:text-2xl"
      >
        {lang === "fa"
          ? "سفر خود را آغاز کنید"
          : lang === "ps"
            ? "خپل سفر پیل کړئ"
            : "Start your trip"}
      </h3>

      {/* Flight search form */}
      <div className="mt-4 w-full">
        <FlightSearchForm />
      </div>

      {/* (logos shown above) */}
    </section>
  );
};
