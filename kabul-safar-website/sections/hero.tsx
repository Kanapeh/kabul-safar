"use client";

import Image from "next/image";
import { Plane } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent, getHeroContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

function HeroTags({
  tags,
  variant,
  isRtl,
}: {
  tags: string[];
  variant: "mobile" | "desktop";
  isRtl: boolean;
}) {
  const positions = isRtl
    ? [
        "top-[18px] right-[48px]",
        "top-[210px] right-[108px]",
        "top-[320px] right-[8px]",
      ]
    : [
        "top-[18px] left-[48px]",
        "top-[210px] left-[108px]",
        "top-[320px] left-[8px]",
      ];

  return (
    <>
      {tags.map((tag, index) => {
        const percentMatch = tag.match(/^(.+?[%٪])\s*(.+)$/);

        return (
          <div
            key={tag}
            className={
              variant === "mobile"
                ? "flex max-w-[95%] items-center gap-xs whitespace-nowrap rounded-full border border-[#e7e5df] bg-white px-2.5 py-1 text-center text-[10px] font-bold text-[#141d2b] shadow-[0_10px_24px_-12px_rgba(20,29,43,0.25)]"
                : `absolute z-40 flex max-w-[160px] items-center gap-xs rounded-full border border-[#e7e5df] bg-white px-3 py-2 text-[10.5px] font-bold leading-snug text-[#141d2b] shadow-[0_10px_24px_-12px_rgba(20,29,43,0.25)] sm:max-w-[180px] sm:px-4 sm:py-[9px] sm:text-[11.5px] ${positions[index] ?? ""}`
            }
          >
            {percentMatch ? (
              <>
                <span className="font-extrabold text-[#c1512f]">
                  {percentMatch[1]}
                </span>
                <span>{percentMatch[2]}</span>
              </>
            ) : (
              tag
            )}
          </div>
        );
      })}
    </>
  );
}

function ArchImage({
  src,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  className: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-t-[200px] rounded-b-2xl ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export const Hero = () => {
  const { lang } = useI18n();
  const content = getHeroContent(lang);
  const blogImages = getBlogContent(lang)
    .posts.slice(0, 3)
    .map((post) => post.image);
  const isRtl = lang === "fa" || lang === "ps";

  const titleLine1 = isRtl
    ? `${content.titlePrefix} ${content.titleIran} ${content.titleAsia}`.trim()
    : content.titlePrefix;

  const desktopArches = isRtl
    ? [
        "absolute top-[120px] right-0 z-10 h-[260px] w-[150px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-[60px] right-[199px] z-20 h-[250px] w-[170px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 right-[80px] z-30 h-[300px] w-[190px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ]
    : [
        "absolute top-[120px] left-0 z-10 h-[260px] w-[150px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-[60px] left-[199px] z-20 h-[250px] w-[170px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 left-[80px] z-30 h-[300px] w-[150px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ];
  const mobileArches = isRtl
    ? [
        "absolute bottom-0 right-0 z-10 h-[155px] w-[105px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute bottom-2 right-[82px] z-20 h-[175px] w-[118px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 right-[172px] z-30 h-[190px] w-[135px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ]
    : [
        "absolute bottom-0 left-0 z-10 h-[155px] w-[105px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute bottom-2 left-[82px] z-20 h-[175px] w-[118px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 left-[172px] z-30 h-[190px] w-[135px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ];

  return (
    <section
      aria-labelledby="hero-title"
      dir={isRtl ? "rtl" : "ltr"}
      className="overflow-hidden rounded-[10px] bg-white px-5 py-6 shadow-[0_30px_70px_-30px_rgba(20,29,43,0.35)] md:rounded-2xl md:px-10 md:pb-10 md:pt-7"
    >
      <div className="mt-4 flex flex-col items-center gap-6 md:mt-7 md:flex-row md:items-center md:gap-8 lg:gap-9">
        {/* Text */}
        <div
          className={`motion-enter w-full min-w-0 flex-1 ${isRtl ? "text-right" : "text-left"} text-center md:text-start`}
        >
          <h1
            id="hero-title"
            className="text-[30px] font-extrabold leading-[1.35] tracking-tight text-[#141d2b] md:text-[44px] lg:text-[52px]"
          >
            {titleLine1}
            <br className="mt-2 block" />
            {content.subTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.9] text-[#5a5f68] md:mx-0 md:mt-5 md:max-w-[420px] md:text-base md:leading-[1.85]">
            {content.description}
          </p>

          <div className="mt-5 w-full md:mb-9">
            <a
              href={CONTACT_WHATSAPP_URL}
              className="hero-visa-cta primary-action motion-action group/visa-cta flex w-full items-center justify-center gap-sm rounded-lg px-[22px] py-[13px] text-[13.5px] font-bold text-white"
            >
              {content.consultCta}
              <Plane
                className="hero-visa-plane h-[18px] w-[18px] shrink-0"
                aria-hidden="true"
              />
            </a>
          </div>

        </div>

        {/* Mobile: arched image cluster below the hero copy */}
        <div className="motion-enter w-full [--motion-delay:160ms] md:hidden">
          <div className="relative mx-auto h-[205px] w-full max-w-[330px]">
            {blogImages.map((src, index) => (
              <ArchImage
                key={src}
                src={src}
                className={mobileArches[index] ?? mobileArches[0]}
                priority={index === 0}
                sizes="(max-width: 768px) 150px, 190px"
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-sm">
              <HeroTags tags={content.tags} variant="mobile" isRtl={isRtl} />
            </div>
          </div>
        </div>

        {/* Desktop: blog images in arch cluster */}
        <div className="motion-enter hidden min-w-0 shrink-0 [--motion-delay:160ms] md:flex md:flex-[1_1_380px] md:justify-center lg:flex-[0_0_380px]">
          <div className="relative h-[400px] w-full max-w-[380px] overflow-hidden">
            {blogImages.map((src, index) => (
              <ArchImage
                key={src}
                src={src}
                className={desktopArches[index] ?? desktopArches[0]}
                priority={index === 0}
                sizes="190px"
              />
            ))}

            <HeroTags tags={content.tags} variant="desktop" isRtl={isRtl} />
          </div>
        </div>
      </div>
    </section>
  );
};
