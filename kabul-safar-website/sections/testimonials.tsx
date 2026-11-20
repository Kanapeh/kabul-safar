"use client";

import { Star } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getTestimonialsContent } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export const Testimonials = () => {
  const { lang } = useI18n();
  const content = getTestimonialsContent(lang);

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="space-y-7">
      <SectionHeading id="testimonials-title" title={content.title} align="center" />

      <ul className="ks-scroll-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
        {content.testimonials.map((testimonial) => (
          <li key={testimonial.id} className="w-[86%] shrink-0 snap-start md:w-auto">
            <figure className="flex h-full flex-col rounded-[20px] bg-navy p-6 text-white md:p-7">
              <div className="flex gap-1" aria-label="5/5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[15px] leading-8 text-white/85">
                {testimonial.message}
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-sm font-extrabold text-navy">
                  {testimonial.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{testimonial.name}</span>
                  <span className="block text-xs text-white/60">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};
