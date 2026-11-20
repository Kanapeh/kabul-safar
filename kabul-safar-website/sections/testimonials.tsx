"use client";

import { Quote, Star } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getTestimonialsContent } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export const Testimonials = () => {
  const { lang } = useI18n();
  const content = getTestimonialsContent(lang);
  const eyebrow = lang === "en" ? "Reviews" : lang === "ps" ? "نظرونه" : "نظرات مسافران";

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="space-y-6">
      <SectionHeading id="testimonials-title" eyebrow={eyebrow} title={content.title} />

      <ul className="ks-scroll-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
        {content.testimonials.map((testimonial) => (
          <li key={testimonial.id} className="w-[86%] shrink-0 snap-start md:w-auto">
            <figure className="ks-card flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" aria-label="5/5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber text-amber" aria-hidden="true" />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-teal/20" aria-hidden="true" />
              </div>

              <blockquote className="mt-4 flex-1 text-[15px] leading-8 text-ink">
                {testimonial.message}
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span>
                  <span className="block text-sm font-extrabold text-ink">{testimonial.name}</span>
                  <span className="block text-xs text-muted">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};
