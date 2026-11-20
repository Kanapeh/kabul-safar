"use client";

import { Globe2, Languages, MessageCircle } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getStatsContent } from "@/lib/data";

const icons = [Languages, Globe2, MessageCircle];

export const Stats = () => {
  const { lang } = useI18n();
  const content = getStatsContent(lang);

  return (
    <section aria-labelledby="stats-title">
      <h2 id="stats-title" className="sr-only">
        {content.title}
      </h2>
      <ul className="grid grid-cols-3 gap-2 rounded-[24px] bg-navy p-2 md:gap-3 md:p-3">
        {content.stats.map((stat, index) => {
          const Icon = icons[index] ?? Globe2;
          return (
            <li
              key={stat.id}
              className="flex flex-col items-center gap-1.5 rounded-[18px] bg-white/5 px-2 py-4 text-center md:flex-row md:gap-4 md:px-5 md:py-5 md:text-start"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber md:h-12 md:w-12">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-extrabold text-white md:text-xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 block text-[11px] leading-5 text-white/65 md:text-sm">
                  {stat.label}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
