"use client";

import Image from "next/image";
import { CheckCircle2, Plane, ShieldCheck } from "lucide-react";
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
      className={`absolute overflow-hidden rounded-t-[999px] rounded-b-[28px] border-4 border-white shadow-[0_24px_48px_-24px_rgba(25,34,56,0.55)] ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 40vw, 220px"
        className="object-cover"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent"
        aria-hidden="true"
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
      ? { eyebrow: "For Afghans living in Europe", flights: "Search flights", trust: "Trusted travel partner" }
      : lang === "ps"
        ? { eyebrow: "په اروپا کې د اوسېدونکو افغانانو لپاره", flights: "الوتنه ولټوئ", trust: "د باور وړ ملګری" }
        : { eyebrow: "ویژه افغان‌های مقیم اروپا", flights: "جستجوی پرواز", trust: "همراه مطمئن سفر" };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-[28px] bg-white px-5 pb-6 pt-8 shadow-[0_24px_60px_-40px_rgba(25,34,56,0.45)] md:rounded-[36px] md:px-12 md:py-14"
    >
      {/* soft decorative wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 end-[-6rem] h-80 w-80 rounded-full bg-teal-soft blur-3xl md:h-[28rem] md:w-[28rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 start-[-5rem] h-64 w-64 rounded-full bg-amber-soft blur-3xl"
      />

      <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        {/* Copy */}
        <div className="motion-enter text-center md:text-start">
          <span className="ks-eyebrow">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
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

          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
            {content.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                <CheckCircle2 className="h-4 w-4 text-teal" aria-hidden="true" />
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
        </div>

        {/* Visual */}
        <div className="motion-enter [--motion-delay:160ms]">
          <div className="relative mx-auto h-[250px] w-full max-w-[340px] md:h-[400px] md:max-w-[420px]">
            {images[0] ? (
              <ArchImage
                src={images[0]}
                priority
                className="start-[30%] top-0 z-20 h-[220px] w-[40%] md:h-[350px]"
              />
            ) : null}
            {images[1] ? (
              <ArchImage
                src={images[1]}
                className="start-0 top-[50px] z-10 h-[180px] w-[34%] md:top-[70px] md:h-[280px]"
              />
            ) : null}
            {images[2] ? (
              <ArchImage
                src={images[2]}
                className="end-0 top-[34px] z-10 h-[190px] w-[34%] md:top-[50px] md:h-[300px]"
              />
            ) : null}

            {/* floating trust card */}
            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex w-fit max-w-full items-center gap-2 rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-lg backdrop-blur md:bottom-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-soft text-amber">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-start">
                <span className="block text-xs font-extrabold text-ink">{labels.trust}</span>
                <span className="block text-[11px] text-muted">
                  {content.tags.join(" · ")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
