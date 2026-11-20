"use client";

import { CheckCircle2, Plane, Scale, Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
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
      "قیمت‌های رقابتی از بیش از 100 ایرلاین معتبر.",
      "پشتیبانی 24 ساعته و خدمات مشتریان برجسته.",
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
      "Competitive prices from over 100 trusted airlines.",
      "24/7 support and excellent customer service.",
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
      "د 100 څخه ډیر باوري الوتونکو شرکتونو څخه رقابتي قیمتونه.",
      "24 ساعته ملاتړ او ښې د مشتریان خدمتونه.",
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
        tone="dark"
        className="pb-24 md:pb-32"
        eyebrow={eyebrow}
        eyebrowIcon={<Plane className="h-3.5 w-3.5" aria-hidden="true" />}
        title={content.title}
        subtitle={content.subtitle}
      />

      <section
        id="flight-search"
        aria-labelledby="flight-form-title"
        className="ks-card relative z-10 -mt-20 scroll-mt-24 px-4 py-6 md:mx-8 md:-mt-24 md:px-10 md:py-9"
      >
        <h2 id="flight-form-title" className="mb-5 flex items-center gap-2 text-lg font-extrabold text-ink md:text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-soft text-teal">
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
            <li key={step.title} className="ks-card flex items-start gap-4 p-5 md:flex-col md:p-7">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                <step.icon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute -end-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white ring-4 ring-white">
                  {lang === "en" ? index + 1 : (index + 1).toLocaleString("fa-IR")}
                </span>
              </span>
              <div>
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
