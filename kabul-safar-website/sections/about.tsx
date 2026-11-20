"use client";

import { useI18n } from "@/components/i18n-provider";
import { getAboutContent } from "@/lib/data";

export const About = () => {
  const { lang } = useI18n();
  const content = getAboutContent(lang);

  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[44rem] text-center">
      <h2 id="about-title" className="text-[24px] font-extrabold text-ink md:text-[34px]">
        {content.title}
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-muted md:text-base md:leading-9">{content.description}</p>
    </section>
  );
};
