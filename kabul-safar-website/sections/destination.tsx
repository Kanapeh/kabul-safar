"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getDestinationContent } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export const Destination = () => {
  const { lang } = useI18n();
  const content = getDestinationContent(lang);
  const isRtl = lang === "fa" || lang === "ps";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const eyebrow = lang === "en" ? "Destinations" : lang === "ps" ? "منزلونه" : "مقصدها";

  return (
    <section aria-labelledby="destinations-title" className="space-y-6">
      <SectionHeading
        id="destinations-title"
        eyebrow={eyebrow}
        title={content.title}
        action={
          <Link
            href="/services"
            className="inline-flex items-center gap-1 rounded-xl px-2 py-1.5 text-sm font-bold text-teal transition-colors hover:bg-teal-soft"
          >
            {content.viewAll}
            <Arrow className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <ul className="ks-scroll-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-5">
        {content.slides.map((slide) => (
          <li key={slide.id} className="w-[70%] shrink-0 snap-start sm:w-[42%] md:w-auto">
            <article className="group relative h-[260px] overflow-hidden rounded-[24px] bg-navy md:h-[300px]">
              <Image
                src={slide.imageSrc}
                alt={slide.subtitle}
                fill
                sizes="(max-width: 768px) 70vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-xl font-extrabold text-white">{slide.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-white/80">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {slide.subtitle}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
