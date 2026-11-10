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
      className="mx-auto w-full max-w-3xl space-y-4"
    >
      <h2
        id="stats-title"
        className="text-center text-xl font-bold text-[#192238] md:text-2xl"
      >
        {content.title}
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {content.stats.map((stat) => (
          <ScrollReveal
            key={stat.id}
            className="w-full"
            delayMs={(stat.id - 1) * 80}
          >
            <article className="flex min-h-23 w-full flex-col items-center justify-center rounded-[20px] bg-[#eef1f4] px-2 py-3 text-center md:min-h-30 md:flex-1 md:p-4">
              <p className="text-base font-bold text-[#087f99] md:text-xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium leading-5 text-[#64717b] md:text-sm">
                {stat.label}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
