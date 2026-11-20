"use client";

import { CheckCircle2, Plane, Scale, Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { ArchVisual } from "@/components/arch-visual";
import { FlightSearchForm } from "@/components/flight-search-form";
import { useI18n } from "@/components/i18n-provider";
import { CtaPromo } from "@/sections/cta-promo";
import { Destination } from "@/sections/destination";

const pageText = {
  fa: {
    title: "پرواز سفرت را ساده برنامه‌ریزی کن",
    subtitle:
      "مبدأ، مقصد و تاریخ را انتخاب کن تا گزینه‌های پرواز مسیرت را بررسی کنی.",
    action: "جستجوی پرواز",
    highlight: "چرا پرواز را از ما رزرو کنید؟",
    points: [
      "مقایسه قیمت میان ایرلاین‌های معتبر بین‌المللی.",
      "پشتیبانی در واتساپ، از جستجو تا صدور بلیط.",
    ],
    steps: [
      {
        title: "جستجوی سریع",
        description:
          "در چند ثانیه بهترین پروازها را برای مسیر خود پیدا کنید.",
        icon: Search,
      },
      {
        title: "مقایسه قیمت‌ها",
        description:
          "قیمت‌ها را از ایرلاین‌های مختلف مقایسه کنید و بهترین گزینه را انتخاب کنید.",
        icon: Scale,
      },
      {
        title: "رزرو آسان",
        description:
          "فرآیند رزرو ساده و سریع با پشتیبانی در تمام مراحل.",
        icon: CheckCircle2,
      },
    ],
  },
  en: {
    title: "Plan your next flight with ease",
    subtitle:
      "Choose your route and dates to explore available flight options.",
    action: "Search flights",
    highlight: "Why book flights with us?",
    points: [
      "Prices compared across trusted international airlines.",
      "WhatsApp support from search to ticket.",
    ],
    steps: [
      {
        title: "Fast search",
        description: "Find the best flights for your route in seconds.",
        icon: Search,
      },
      {
        title: "Compare prices",
        description:
          "Compare prices from different airlines and choose the best option.",
        icon: Scale,
      },
      {
        title: "Easy booking",
        description: "Simple and quick booking process with support at every step.",
        icon: CheckCircle2,
      },
    ],
  },
  ps: {
    title: "خپله راتلونکې الوتنه په اسانه پلان کړئ",
    subtitle: "د خپلې لارې او نېټې په ټاکلو سره د الوتنې شته انتخابونه وګورئ.",
    action: "الوتنه وپلټئ",
    highlight: "ولې زمونږ سره الوتنه راجستر کړئ؟",
    points: [
      "د باوري نړیوالو هوايي شرکتونو ترمنځ د بیو پرتله.",
      "په واټساپ کې ملاتړ، له لټون تر ټکټ پورې.",
    ],
    steps: [
      {
        title: "چټک لټون",
        description:
          "خپل لار لپاره غوره الوتنې په څو ثانیو کې ومومئ.",
        icon: Search,
      },
      {
        title: "د بیو پرتله",
        description:
          "د مختلفو الوتونکو شرکتونو څخه بیې پرتله کړئ او غوره انتخاب وټاکئ.",
        icon: Scale,
      },
      {
        title: "اسانه راجستر",
        description:
          "ساده او چټکه بکینګ پروسه په هر پړاو کې له ملاتړ سره.",
        icon: CheckCircle2,
      },
    ],
  },
};

export default function FlightsPage() {
  const { lang } = useI18n();
  const content = pageText[lang] ?? pageText.fa;
  const eyebrow = lang === "en" ? "Flight search" : lang === "ps" ? "د الوتنې لټون" : "جستجوی پرواز";
  const formTitle = lang === "fa" ? "مسیر سفر خود را وارد کنید" : lang === "ps" ? "د خپل سفر لاره ولیکئ" : "Enter your route";

  return (
    <PageShell>
      <PageHero
        eyebrow={eyebrow}
        eyebrowIcon={<Plane className="h-3.5 w-3.5" aria-hidden="true" />}
        title={content.title}
        subtitle={content.subtitle}
        actions={
          <a href="#flight-search" className="ks-btn ks-btn-primary py-4 sm:px-7">
            <Search className="h-5 w-5" aria-hidden="true" />
            {content.action}
          </a>
        }
        aside={
          <ArchVisual
            src="/images/destination-turkey.jpg"
            badgeIcon={
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-soft text-navy">
                <Plane className="h-4 w-4" aria-hidden="true" />
              </span>
            }
            badge={lang === "en" ? "Flights to any destination" : lang === "ps" ? "هر منزل ته الوتنه" : "پرواز به هر مقصد"}
          />
        }
      />

      <section
        id="flight-search"
        aria-labelledby="flight-form-title"
        className="scroll-mt-24 rounded-[20px] border border-line bg-white px-4 py-6 md:px-10 md:py-9"
      >
        <h2 id="flight-form-title" className="mb-5 flex items-center gap-2 text-lg font-extrabold text-ink md:text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-navy">
            <Search className="h-4 w-4" aria-hidden="true" />
          </span>
          {formTitle}
        </h2>
        <FlightSearchForm />
      </section>

      <section aria-labelledby="why-book" className="space-y-6">
        <div className="text-center">
          <h2 id="why-book" className="text-[22px] font-extrabold text-ink md:text-[30px]">
            {content.highlight}
          </h2>
          <ul className="mx-auto mt-4 flex max-w-[44rem] flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
            {content.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-semibold text-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ol className="grid gap-3 md:grid-cols-3 md:gap-5">
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col rounded-[20px] bg-teal-soft p-5 md:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {lang === "en" ? index + 1 : (index + 1).toLocaleString("fa-IR")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
                  <step.icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-base font-extrabold text-ink md:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Destination />
      <CtaPromo />
    </PageShell>
  );
}
