"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getTestimonialsContent } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Testimonials = () => {
  const { lang } = useI18n();
  const content = getTestimonialsContent(lang);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="space-y-4"
    >
      <h2
        id="testimonials-title"
        className="text-right text-xl font-bold text-[#192238] md:text-2xl"
      >
        {content.title}
      </h2>

      <div className="flex gap-3 overflow-x-auto px-1 pb-2 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pt-6">
        {content.testimonials.map((testimonial) => (
          <ScrollReveal
            key={testimonial.id}
            className="min-w-full md:min-w-0"
            delayMs={(content.testimonials.indexOf(testimonial) % 3) * 90}
          >
            <article className="relative h-full rounded-[24px] bg-white px-5 pb-5 pt-9 shadow-[0_8px_24px_rgba(25,34,56,0.05)] md:px-6 md:pb-6 md:pt-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
              </div>

              <div className="absolute bottom-3 left-3 h-6 w-1 rounded-full bg-[#0b86a3]" />
              <div className="absolute right-2 top-2 h-6 w-1 rounded-full bg-[#0b86a3]" />

              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-[#f4b740] text-[#f4b740]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="mt-3 text-right text-sm font-medium leading-7 text-[#192238] md:text-base md:leading-7">
                {testimonial.message}
              </p>

              <div className="mt-2 text-right">
                <p className="text-sm font-bold text-[#192238] md:text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-[#64717b] md:text-xs">
                  {testimonial.role}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
