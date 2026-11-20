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
        {/* connector line (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[16%] top-[3.25rem] hidden border-t-2 border-dashed border-teal/25 md:block"
        />
        {content.steps.map((step) => (
          <li key={step.id}>
            <ScrollReveal className="h-full" delayMs={(step.id - 1) * 100}>
              <article className="ks-card relative flex h-full items-start gap-4 p-5 md:flex-col md:items-center md:p-7 md:text-center">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -end-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white ring-4 ring-white">
                    {toDigits(step.id)}
                  </span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold leading-7 text-ink md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{step.description}</p>
                </div>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
};
