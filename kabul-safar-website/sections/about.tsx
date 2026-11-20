"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getAboutContent } from "@/lib/data";

export const About = () => {
  const { lang } = useI18n();
  const content = getAboutContent(lang);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="flex flex-col items-center gap-4 rounded-[24px] bg-amber-soft/70 p-6 text-center md:flex-row md:gap-6 md:p-8 md:text-start"
    >
      <Image
        src="/images/Kabul%20safar%20logo.jpg"
        alt=""
        width={72}
        height={72}
        className="h-16 w-16 shrink-0 rounded-2xl border border-white bg-white object-contain shadow-sm md:h-[72px] md:w-[72px]"
      />
      <div className="min-w-0">
        <h2 id="about-title" className="text-lg font-extrabold text-ink md:text-xl">
          {content.title}
        </h2>
        <p className="mt-2 text-[15px] leading-8 text-ink/80">{content.description}</p>
      </div>
    </section>
  );
};
