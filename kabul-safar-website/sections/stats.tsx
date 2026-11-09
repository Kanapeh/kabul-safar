"use client";

import { useI18n } from "@/components/i18n-provider";
import { getStatsContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Stats = () => {
  const { lang } = useI18n();
  const content = getStatsContent(lang);

  return (
    <section
      aria-labelledby="stats-title"
      className="mx-auto w-full max-w-3xl space-y-3"
    >
      <h2 id="stats-title" className="text-center text-sm font-bold text-black md:text-2xl">
        {content.title}
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {content.stats.map((stat) => (
          <ScrollReveal key={stat.id} className="w-full" delayMs={(stat.id - 1) * 80}>
          <article
            className="flex min-h-[76px] w-full flex-col items-center justify-center rounded-[10px] bg-[#f6f8f8] px-2 py-2 text-center md:min-h-[120px] md:flex-1 md:rounded-2xl md:p-4"
          >
            <p className="text-xs font-bold tracking-wide text-[#0dadd1] md:text-xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[10px] font-medium leading-4 text-[#333] md:text-sm">
              {stat.label}
            </p>
          </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
