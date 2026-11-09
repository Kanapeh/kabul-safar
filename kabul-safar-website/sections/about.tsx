"use client";

import { useI18n } from "@/components/i18n-provider";
import { getAboutContent } from "@/lib/data";

export const About = () => {
  const { lang } = useI18n();
  const content = getAboutContent(lang);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-3xl space-y-4"
    >
      <header className="space-y-2 text-center">
        <h2 id="about-title" className="text-sm font-bold tracking-wide text-black md:text-2xl">
          {content.title}
        </h2>
      </header>
      <p className="text-center text-sm leading-6 text-slate-700 md:text-base md:leading-7">
        {content.description}
      </p>
    </section>
  );
};
