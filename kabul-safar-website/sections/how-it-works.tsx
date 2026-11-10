"use client";

import { useI18n } from "@/components/i18n-provider";
import { getHowItWorksContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export const HowItWorks = () => {
  const { lang } = useI18n();
  const content = getHowItWorksContent(lang);

  return (
    <section
      id="services"
      aria-labelledby="how-it-works-title"
      className="space-y-4"
    >
      <header className="space-y-1 text-center">
        <h2
          id="how-it-works-title"
          className="text-lg font-bold text-[#192238] md:text-2xl"
        >
          {content.title}
        </h2>
        <p className="text-sm leading-6 text-[#64717b] md:mx-auto md:max-w-3xl md:text-base md:leading-7">
          {content.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {content.steps.map((step) => (
          <ScrollReveal
            key={step.id}
            className="h-full"
            delayMs={(step.id - 1) * 100}
          >
            <article className="relative flex h-full flex-row items-center gap-4 rounded-[22px] bg-white p-5 text-[#192238] shadow-[0_8px_24px_rgba(25,34,56,0.05)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg md:min-h-52.5 md:flex-col md:items-start md:p-6">
              <div className="flex shrink-0 items-start justify-between">
                <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#e5f5f9] md:inline-flex md:h-12 md:w-12">
                  <step.icon
                    className="h-5 w-5 text-[#087f99]"
                    aria-hidden="true"
                  />
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5f5f9] text-base font-bold text-[#087f99] md:hidden">
                  {step.id}
                </span>
              </div>

              <div className="min-w-0 flex-1 text-right md:flex-none">
                <h3 className="text-base font-bold leading-6 md:text-lg md:leading-7">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#64717b] md:mt-2 md:text-sm md:leading-6">
                  {step.description}
                </p>
              </div>

              <div className="hidden md:block absolute left-1/2 bottom-4 -translate-x-1/2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2c6994] md:h-10 md:w-10 md:text-base">
                  {step.id}
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
