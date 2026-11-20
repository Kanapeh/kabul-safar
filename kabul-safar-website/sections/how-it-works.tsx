"use client";

import { useI18n } from "@/components/i18n-provider";
import { getHowItWorksContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export const HowItWorks = () => {
  const { lang } = useI18n();
  const content = getHowItWorksContent(lang);
  const eyebrow = lang === "en" ? "How it works" : lang === "ps" ? "څنګه کار کوي" : "روند کار";
  const toDigits = (n: number) =>
    lang === "en" ? String(n) : n.toLocaleString("fa-IR");

  return (
    <section id="services" aria-labelledby="how-it-works-title" className="space-y-6">
      <SectionHeading
        id="how-it-works-title"
        eyebrow={eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        align="center"
      />

      <ol className="relative grid gap-3 md:grid-cols-3 md:gap-5">
        {content.steps.map((step) => (
          <li key={step.id}>
            <ScrollReveal className="h-full" delayMs={(step.id - 1) * 100}>
              <article className="flex h-full flex-col rounded-[20px] bg-teal-soft p-5 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {toDigits(step.id)}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold leading-7 text-ink md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-7 text-muted">{step.description}</p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
};
