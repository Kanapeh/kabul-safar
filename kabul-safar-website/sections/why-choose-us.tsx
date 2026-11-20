"use client";

import { useI18n } from "@/components/i18n-provider";
import { getWhyContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export const WhyChooseUs = () => {
  const { lang } = useI18n();
  const content = getWhyContent(lang);
  const eyebrow = lang === "en" ? "Our promise" : lang === "ps" ? "زموږ ژمنه" : "تعهد ما";

  return (
    <section aria-labelledby="why-choose-title" className="space-y-6">
      <SectionHeading
        id="why-choose-title"
        eyebrow={eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        align="center"
      />

      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {content.features.map((feature) => (
          <ScrollReveal key={feature.id} className="h-full" delayMs={(feature.id - 1) * 90}>
            <article className="motion-card flex h-full items-start gap-4 rounded-[22px] border border-line bg-canvas/60 p-5 md:flex-col md:p-6">
              <span className="motion-card-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-sm">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-ink md:text-lg">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-muted">{feature.description}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
