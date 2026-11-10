"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getDestinationContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Destination = () => {
  const { lang } = useI18n();
  const content = getDestinationContent(lang);
  const isRtl = lang === "fa" || lang === "ps";

  return (
    <section aria-label={content.title} className="space-y-lg">
      <div className="relative flex justify-center px-1 text-center md:mb-1">
        <h2 className="text-lg font-bold text-[#192238] md:text-2xl">
          {content.title}
        </h2>
        <a
          href="#"
          className="absolute inset-y-0 left-1 flex items-center text-xs font-semibold text-[#087f99] md:text-sm"
        >
          {content.viewAll}
        </a>
      </div>

      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:pb-0"
      >
        {content.slides.map((slide, index) => (
          <ScrollReveal
            key={slide.id}
            className="h-full w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto lg:shrink lg:snap-none"
            delayMs={(index % 2) * 70}
          >
            <article className="h-full overflow-hidden rounded-[22px] bg-white shadow-[0_8px_24px_rgba(25,34,56,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative">
                <Image
                  src={slide.imageSrc}
                  alt={slide.subtitle}
                  width={180}
                  height={560}
                  className="h-[135px] w-full object-cover md:h-[190px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#192238]/65 via-transparent to-transparent" />
                <h3 className="absolute inset-x-3 bottom-3 text-right text-lg font-bold text-white md:text-2xl">
                  {slide.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-3 text-xs font-semibold text-[#64717b] md:px-4 md:text-sm">
                <MapPin className="h-4 w-4 text-[#087f99]" aria-hidden="true" />
                <span>{slide.subtitle}</span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
