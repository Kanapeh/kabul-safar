"use client";

import { useI18n } from "@/components/i18n-provider";
import { getWhyContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export const WhyChooseUs = () => {
  const { lang } = useI18n();
  const content = getWhyContent(lang);

  return (
    <section aria-labelledby="why-choose-title" className="space-y-4">
      <header className="space-y-1 text-center">
        <h2
          id="why-choose-title"
          className="text-xl font-bold text-[#192238] md:text-2xl"
        >
          {content.title}
        </h2>
        <p className="text-sm leading-6 text-[#64717b] md:mx-auto md:max-w-3xl md:text-base md:leading-7">
          {content.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {content.features.map((feature) => (
          <ScrollReveal
            key={feature.id}
            className="h-full"
            delayMs={(feature.id - 1) * 90}
          >
            <article className="flex min-h-[92px] h-full flex-row items-center gap-4 rounded-[22px] bg-white px-4 py-4 text-right text-[#192238] shadow-[0_8px_24px_rgba(25,34,56,0.05)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg md:min-h-[220px] md:flex-col md:items-center md:px-5 md:py-6 md:text-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#234b53] text-white md:h-14 md:w-14">
                <feature.icon
                  className="h-6 w-6 md:h-7 md:w-7"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0 md:flex-1">
                <h3 className="text-base font-bold md:mt-4 md:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#64717b] md:mt-2 md:text-sm md:leading-6">
                  {feature.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
