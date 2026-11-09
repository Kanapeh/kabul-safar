"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { FlightSearchForm } from "@/components/flight-search-form";
import { useI18n } from "@/components/i18n-provider";

import { FileCheck, Send, Clock, Plane, MapPin, Search } from "lucide-react";

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
        icon: FileCheck,
      },
      {
        title: "مقایسه قیمت‌ها",
        description:
          "قیمت‌ها را از ایرلاین‌های مختلف مقایسه کنید و بهترین گزینه را انتخاب کنید.",
        icon: Send,
      },
      {
        title: "رزرو آسان",
        description:
          "فرآیند رزرو ساده و سریع با پشتیبانی در تمام مراحل.",
        icon: Clock,
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
        icon: FileCheck,
      },
      {
        title: "Compare prices",
        description:
          "Compare prices from different airlines and choose the best option.",
        icon: Send,
      },
      {
        title: "Easy booking",
        description: "Simple and quick booking process with support at every step.",
        icon: Clock,
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
        title: "چ٫که لټون",
        description:
          "خپل لار لپاره غوره الوتنې په چندانو ثانیو کې ومومئ.",
        icon: FileCheck,
      },
      {
        title: "د قیمتونو پرتګال",
        description:
          "د مختلفو الوتونکو شرکتونو څخه قیمتونه پرتګال کړئ او غوره غوره وټاکئ.",
        icon: Send,
      },
      {
        title: "اسانه راجستر",
        description:
          "ساده او چ٫که راجستر پروسه په هر پړاو کې ملاتڬ سره.",
        icon: Clock,
      },
    ],
  },
};

export default function VisaPage() {
  const { lang } = useI18n();
  const content = pageText[lang];
  const isRtl = lang !== "en";

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 max-w-7xl">
        <main className="space-y-12 px-4 py-8 md:px-8 md:py-12">
          <Header />

          {/* Hero Section */}
          <section
            dir={isRtl ? "rtl" : "ltr"}
            className="relative overflow-hidden rounded-[28px] bg-[#10263b] p-6 shadow-xl md:rounded-[32px] md:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#0dadd1]/20 blur-3xl" />
            <div className="relative z-10">
              <div className={`motion-enter w-full max-w-[42rem] md:pe-[15rem] ${isRtl ? "text-right" : "text-left"}`}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-cyan-100">
                  <Plane className="h-3.5 w-3.5" aria-hidden="true" />
                  {lang === "en" ? "FLIGHT SEARCH" : lang === "ps" ? "د الوتنې لټون" : "جستجوی پرواز"}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-black leading-[1.35] text-white md:text-5xl md:leading-tight">
                  {content.title}
                </h1>
                <p className="mt-4 max-w-[36rem] text-pretty text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                  {content.subtitle}
                </p>
                <a
                  href="#flight-search"
                  className="primary-action motion-action mt-6 inline-flex min-h-12 items-center justify-center gap-sm rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg md:px-6 md:text-base"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  {content.action}
                </a>
              </div>

              <div className="motion-enter relative mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-[32px] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-sm [--motion-delay:160ms] md:absolute md:end-0 md:top-1/2 md:mx-0 md:mt-0 md:h-52 md:w-52 md:-translate-y-1/2">
                <div className="absolute inset-4 rounded-[26px] border border-dashed border-cyan-100/35" />
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0dadd1] text-white shadow-lg md:h-20 md:w-20">
                  <Plane className="h-8 w-8 md:h-10 md:w-10" aria-hidden="true" />
                </div>
                <MapPin className="absolute bottom-5 left-5 h-5 w-5 text-cyan-100" aria-hidden="true" />
                <MapPin className="absolute right-5 top-5 h-5 w-5 text-white/70" aria-hidden="true" />
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section className="rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl ring-1 ring-slate-200/50 md:p-12">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900 md:text-3xl">
                {content.highlight}
              </h2>
            </div>
            <div className="grid gap-3 grid-cols-3">
              {content.steps.map((step) => (
                <div
                  key={step.title}
                  className="motion-card group overflow-hidden rounded-[20px] border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-3 shadow-lg ring-1 ring-slate-200/50"
                >
                  <div className="motion-card-icon flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg md:h-10 md:w-10">
                    <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="mt-2 text-[10px] font-bold text-slate-900 md:text-sm group-hover:text-[#0dadd1] transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[9px] leading-3 text-slate-600 md:text-xs md:leading-4">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Flight Search Form Section */}
          <section id="flight-search" className="scroll-mt-8 rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl ring-1 ring-slate-200/50 md:p-12">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900 md:text-3xl">
                {lang === "fa" ? "جستجوی پرواز" : lang === "ps" ? "الوتنه وپلټئ" : "Search Flights"}
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                {lang === "fa" ? "بهترین پروازها را برای سفر خود پیدا کنید" : lang === "ps" ? "خپل سفر لپاره غوره الوتنې ومومئ" : "Find the best flights for your trip"}
              </p>
            </div>
            <div className="w-full">
              <FlightSearchForm />
            </div>
          </section>

          <About />
          <CtaPromo />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
