import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Inner-page hero that matches the homepage hero (soft washes, big type). */
export function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  actions,
  aside,
  tone = "light",
  className = "",
}: PageHeroProps) {
  const dark = tone === "dark";

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] px-5 py-9 md:rounded-[36px] md:px-12 md:py-14 ${className} ${
        dark
          ? "bg-navy text-white"
          : "bg-white shadow-[0_24px_60px_-40px_rgba(25,34,56,0.45)]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 end-[-6rem] h-80 w-80 rounded-full blur-3xl md:h-[26rem] md:w-[26rem] ${
          dark ? "bg-teal/45" : "bg-teal-soft"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-24 start-[-5rem] h-64 w-64 rounded-full blur-3xl ${
          dark ? "bg-amber/20" : "bg-amber-soft"
        }`}
      />

      <div
        className={`relative grid items-center gap-8 ${aside ? "md:grid-cols-[1.15fr_0.85fr] md:gap-12" : ""}`}
      >
        <div className={`motion-enter ${aside ? "text-center md:text-start" : "mx-auto max-w-[44rem] text-center"}`}>
          {eyebrow ? (
            <span
              className={
                dark
                  ? "inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85"
                  : "ks-eyebrow"
              }
            >
              {eyebrowIcon}
              {eyebrow}
            </span>
          ) : null}
          <h1
            className={`mt-4 text-[30px] font-black leading-[1.4] md:text-[44px] lg:text-[50px] ${dark ? "text-white" : "text-ink"}`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mx-auto mt-4 max-w-[36rem] text-[15px] leading-8 md:text-lg md:leading-9 ${aside ? "md:mx-0" : ""} ${
                dark ? "text-white/70" : "text-muted"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
          {actions ? (
            <div
              className={`mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center ${aside ? "md:justify-start" : ""}`}
            >
              {actions}
            </div>
          ) : null}
        </div>

        {aside ? <div className="motion-enter [--motion-delay:160ms]">{aside}</div> : null}
      </div>
    </section>
  );
}
