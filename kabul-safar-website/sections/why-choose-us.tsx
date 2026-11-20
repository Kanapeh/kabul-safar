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

      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {content.features.map((feature) => (
          <ScrollReveal key={feature.id} className="h-full" delayMs={(feature.id - 1) * 90}>
            <article className="flex h-full flex-col items-center px-4 py-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-soft text-navy">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-extrabold text-ink md:text-lg">{feature.title}</h3>
              <p className="mt-1.5 max-w-[20rem] text-sm leading-7 text-muted">{feature.description}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
