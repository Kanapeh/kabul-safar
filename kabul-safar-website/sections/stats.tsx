"use client";

import { useI18n } from "@/components/i18n-provider";
import { getStatsContent } from "@/lib/data";

export const Stats = () => {
  const { lang } = useI18n();
  const content = getStatsContent(lang);

  return (
    <section aria-labelledby="stats-title">
      <h2 id="stats-title" className="sr-only">
        {content.title}
      </h2>
      <ul className="grid grid-cols-3 gap-2 md:gap-5">
        {content.stats.map((stat) => (
          <li
            key={stat.id}
            className="flex flex-col items-center justify-center rounded-[18px] border border-line bg-white px-2 py-5 text-center md:rounded-[20px] md:py-8"
          >
            <span className="text-lg font-black text-navy md:text-[32px] md:leading-tight">{stat.value}</span>
            <span className="mt-1 text-[11px] leading-5 text-muted md:text-sm">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
