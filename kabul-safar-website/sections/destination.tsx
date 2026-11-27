"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getDestinationContent } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

// First two destinations get the wide slots (Figma 2-up), the rest share a row of three.
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export const Destination = () => {
  const { lang } = useI18n();
  const content = getDestinationContent(lang);
  const isRtl = lang === "fa" || lang === "ps";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const subtitle =
    lang === "en"
      ? "Visa and travel services for these destinations — and beyond."
      : lang === "ps"
        ? "د دې منزلونو او نورو هېوادونو لپاره ویزه او د سفر خدمتونه."
        : "خدمات ویزه و سفر برای این مقصدها و سایر کشورها.";

  return (
    <section aria-labelledby="destinations-title" className="space-y-7">
      <SectionHeading id="destinations-title" title={content.title} subtitle={subtitle} align="center" />

      <ul className="ks-scroll-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0">
        {content.slides.map((slide, index) => (
          <li key={slide.id} className={`w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto ${spans[index] ?? "md:col-span-2"}`}>
            <article className="group">
              <div className="relative h-[180px] overflow-hidden rounded-[18px] bg-navy md:h-[220px]">
                <Image
                  src={slide.imageSrc}
                  alt={slide.subtitle}
                  fill
                  sizes="(max-width: 768px) 78vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/30" />
                <h3 className="absolute inset-0 flex items-center justify-center px-3 text-center text-[34px] font-black text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.45)] md:text-[48px]">
                  {slide.title}
                </h3>
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 px-1 text-sm font-semibold text-ink">
                <MapPin className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                {slide.subtitle}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-teal transition-colors hover:bg-teal-soft"
        >
          {content.viewAll}
          <Arrow className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
