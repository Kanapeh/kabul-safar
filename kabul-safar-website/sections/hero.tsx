"use client";

import Image from "next/image";
import { Check, Plane } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent, getHeroContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

function ArchImage({
  src,
  className,
  priority = false,
}: {
  src: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-t-[999px] rounded-b-[28px] border-[5px] border-white/90 shadow-[0_28px_50px_-24px_rgba(20,60,72,0.6)] ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 40vw, 220px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

export const Hero = () => {
  const { lang } = useI18n();
  const content = getHeroContent(lang);
  const images = getBlogContent(lang)
    .posts.slice(0, 3)
    .map((post) => post.image);

  const labels =
    lang === "en"
      ? { eyebrow: "For Afghans living in Europe", flights: "Search flights", note: "Replies on WhatsApp — no sign-up needed" }
      : lang === "ps"
        ? { eyebrow: "په اروپا کې د اوسېدونکو افغانانو لپاره", flights: "الوتنه ولټوئ", note: "په واټساپ کې ځواب — نوم لیکنې ته اړتیا نشته" }
        : { eyebrow: "ویژه افغان‌های مقیم اروپا", flights: "جستجوی پرواز", note: "پاسخ در واتساپ، بدون نیاز به ثبت‌نام" };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-[28px] bg-teal-soft px-5 pb-8 pt-9 md:rounded-[32px] md:px-14 md:py-14"
    >
      {/* soft light wash, same as inner-page heroes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 end-[-6rem] h-80 w-80 rounded-full bg-white/70 blur-3xl md:h-[26rem] md:w-[26rem]"
      />

      <div className="relative grid items-center gap-9 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        {/* Copy */}
        <div className="motion-enter text-center md:text-start">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-navy">
            {labels.eyebrow}
          </span>

          <h1
            id="hero-title"
            className="mt-4 text-[34px] font-black leading-[1.4] text-ink sm:text-[40px] md:text-[48px] lg:text-[56px]"
          >
            <span className="block whitespace-nowrap">{content.titlePrefix}</span>
            <span className="block whitespace-nowrap text-teal">
              {`${content.titleIran} ${content.titleAsia}`.trim()}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[30rem] text-[15px] leading-8 text-muted md:mx-0 md:text-lg md:leading-9">
            {content.description}
          </p>

          <ul className="mt-5 inline-flex flex-col items-start gap-2 text-start">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hero-visa-cta ks-btn ks-btn-primary w-full py-4 text-base sm:w-auto sm:px-7"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {content.consultCta}
            </a>
            <a
              href="#flight-search"
              className="ks-btn ks-btn-ghost w-full py-4 text-base sm:w-auto sm:px-6"
            >
              <Plane className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              {labels.flights}
            </a>
          </div>
          <p className="mt-3 text-xs font-medium text-muted">{labels.note}</p>
        </div>

        {/* Visual — the client's own photos, no stock illustration */}
        <div className="motion-enter [--motion-delay:160ms]">
          <div className="relative mx-auto h-[250px] w-full max-w-[340px] md:h-[400px] md:max-w-[420px]">
            {/* Brand accent: the Figma bright cyan, kept as a shape behind the photos */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {[
                "left-[-2%] top-[24%] opacity-100",
                "left-[16%] top-[50%] opacity-70",
                "left-[-18%] top-[76%] opacity-40",
              ].map((cls) => (
                <span
                  key={cls}
                  className={`absolute h-10 w-[104%] -rotate-[22deg] rounded-full bg-sky md:h-14 ${cls}`}
                />
              ))}
            </div>
            {images[0] ? (
              <ArchImage
                src={images[0]}
                priority
                className="start-[30%] top-0 z-20 h-[230px] w-[40%] md:h-[370px]"
              />
            ) : null}
            {images[1] ? (
              <ArchImage
                src={images[1]}
                className="start-0 top-[50px] z-10 h-[185px] w-[34%] md:top-[70px] md:h-[290px]"
              />
            ) : null}
            {images[2] ? (
              <ArchImage
                src={images[2]}
                className="end-0 top-[34px] z-10 h-[195px] w-[34%] md:top-[50px] md:h-[310px]"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
