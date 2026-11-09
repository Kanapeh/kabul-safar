"use client";

import { BookOpen, Compass, FileText, Plane } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const BlogHero = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);
  const isRtl = lang !== "en";

  return (
    <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden border-b border-slate-200 bg-[#f2f8fa] py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div className={`motion-enter max-w-3xl ${isRtl ? "text-right" : "text-left"}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#087f99] shadow-sm ring-1 ring-[#0dadd1]/15">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {lang === "en" ? "TRAVEL NOTES" : lang === "ps" ? "د سفر لارښوونې" : "یادداشت‌های سفر"}
          </span>
          <h1 className="mt-4 text-balance text-3xl font-black leading-[1.4] text-[#10263b] md:text-5xl md:leading-tight">
            {content.hero.title}
          </h1>
          <p className="mt-4 max-w-[42rem] text-pretty text-sm leading-7 text-slate-600 md:text-base md:leading-8">
            {content.hero.subtitle}
          </p>
        </div>

        <div className="motion-enter relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center rounded-[28px] bg-[#0dadd1] shadow-[0_24px_50px_-24px_rgba(13,173,209,0.65)] [--motion-delay:160ms] md:mx-0 md:h-48 md:w-48">
          <div className="absolute inset-3 rounded-[22px] border border-dashed border-white/40" />
          <BookOpen className="h-16 w-16 text-white md:h-20 md:w-20" strokeWidth={1.5} aria-hidden="true" />
          <div className="absolute -bottom-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#087f99] shadow-lg">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <Plane className="absolute -right-2 -top-2 h-9 w-9 rotate-[-18deg] rounded-xl bg-white p-2 text-[#087f99] shadow-lg" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
