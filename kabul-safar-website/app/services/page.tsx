"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";
import { Shield, Globe, Heart, Zap, Users, Plane, MapPin } from "lucide-react";

const pageText = {
  fa: {
    title: "از ویزا تا پرواز، همراه سفر شما",
    subtitle:
      "برای ویزا، تهیه بلیط و برنامه‌ریزی سفر، راهنمایی روشن و پشتیبانی دریافت کنید.",
    action: "شروع مشاوره",
    highlight: "سفر شما امن و آسان خواهد بود",
    highlightText:
      "ما مسیر سفر شما را مطابق نیازهایتان بهینه‌سازی می‌کنیم و تا پایان همراهتان هستیم.",
    items: [
      {
        title: "ویزای ایران",
        description:
          "دریافت ویزای ایران برای شهروندان افغانستانی با پشتیبانی کامل و سریع.",
        icon: Shield,
      },
      {
        title: "ویزای ترکیه",
        description:
          "اخذ ویزای ترکیه با راهنمایی تخصصی و پشتیبانی در تمام مراحل.",
        icon: Shield,
      },
      {
        title: "حج و عمره",
        description:
          "خدمات کامل برای حج و عمره با راهنمایی‌های تخصصی و پشتیبانی کامل.",
        icon: Heart,
      },
      {
        title: "سفر به کربلا",
        description:
          "سفرهای زیارتی به کربلا با خدمات کامل و پشتیبانی حرفه‌ای.",
        icon: MapPin,
      },
      {
        title: "مشاوره سفر شخصی‌سازی شده",
        description:
          "برنامه سفر شما با توجه به هدف، بودجه و شرایط شخصی شما طراحی می‌شود.",
        icon: Users,
      },
      {
        title: "رزرو پروازهای تایید شده",
        description:
          "پروازهای معتبر و مطمئن با بهترین قیمت‌ها برای مسیرهای ایران و اروپا.",
        icon: Zap,
      },
      {
        title: "پشتیبانی واتساپ ۲۴/۷",
        description: "پاسخ سریع و همراهی کامل با شما در هر مرحله از سفر.",
        icon: Globe,
      },
    ],
  },
  en: {
    title: "From visas to flights, travel with confidence",
    subtitle:
      "Get clear guidance for visas, flight bookings, and planning your next trip.",
    action: "Start consultation",
    highlight: "Your travel is safe and easy",
    highlightText:
      "We optimize your travel route and stay with you until the end.",
    items: [
      {
        title: "Iran Visa",
        description:
          "Iran visa services for Afghan citizens with full support and fast processing.",
        icon: Shield,
      },
      {
        title: "Turkey Visa",
        description:
          "Turkey visa acquisition with expert guidance and full process support.",
        icon: Shield,
      },
      {
        title: "Hajj & Umrah",
        description:
          "Complete services for Hajj and Umrah with specialized guidance and full support.",
        icon: Heart,
      },
      {
        title: "Karbala Travel",
        description:
          "Pilgrimage trips to Karbala with complete services and professional support.",
        icon: MapPin,
      },
      {
        title: "Personal travel consultation",
        description:
          "Your trip plan is tailored to your purpose, budget, and personal needs.",
        icon: Users,
      },
      {
        title: "Verified flight booking",
        description:
          "Reliable flights with the best prices for routes to Iran and Europe.",
        icon: Zap,
      },
      {
        title: "24/7 WhatsApp support",
        description:
          "Fast responses and full assistance at every stage of your trip.",
        icon: Globe,
      },
    ],
  },
  ps: {
    title: "له ویزې تر الوتنې، ستاسو د سفر ملګري",
    subtitle:
      "د ویزې، د الوتنې د ټکټ او سفر د پلان لپاره روښانه لارښوونه او ملاتړ ترلاسه کړئ.",
    action: "د مشورې پیل",
    highlight: "ستاسو سفر خوندي او اسانه دی",
    highlightText:
      "موږ ستاسو د سفر لاره ستاسو د اړتیاوو سره سم تنظیموو او تر پایه ستاسو سره یوو.",
    items: [
      {
        title: "د ایران ویزه",
        description:
          "د افغان وګړو لپاره د ایران ویزې خدمتونه د بشپړ ملاتړ او چټک پروسې سره.",
        icon: Shield,
      },
      {
        title: "د ترکیې ویزه",
        description:
          "د ترکیې ویزې ترلاسه کولو د مسلکي لارښوونې او بشپړ بهیر ملاتړ سره.",
        icon: Shield,
      },
      {
        title: "حج او عمره",
        description:
          "د حج او عمرې لپاره بشپړ خدمتونه د مسلکي لارښوونې او بشپړ ملاتڵ سره.",
        icon: Heart,
      },
      {
        title: "د کربلا سفر",
        description:
          "د کربلا زیارت سفرونه د بشپړ خدمتونو او مسلکي ملاتړ سره.",
        icon: MapPin,
      },
      {
        title: "شخصي سفر مشوره",
        description:
          "ستاسو د سفر پلان ستاسو هدف، بودیجه او شخصي اړتیاوو ته برابرېږي.",
        icon: Users,
      },
      {
        title: "باوري الوتنې بکینګ",
        description: "د ایران او اروپا لپاره باوري الوتنې د غوره بیو سره.",
        icon: Zap,
      },
      {
        title: "۲۴/۷ واتساپ ملاتړ",
        description: "چ٫ک ځوابونه او بشپړ مرسته په هر پړاو کې.",
        icon: Globe,
      },
    ],
  },
};

export default function ServicesPage() {
  const { lang, dir } = useI18n();
  const content = pageText[lang];
  const isRtl = dir === "rtl";

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full max-w-7xl overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="space-y-12 px-4 py-8 md:px-8 md:py-12">
          <Header />

          {/* Hero Section */}
          <section
            dir={isRtl ? "rtl" : "ltr"}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#063b49] via-[#087f99] to-[#0dadd1] p-6 shadow-xl md:rounded-[32px] md:p-12"
          >
            <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10">
              <div className={`motion-enter w-full max-w-[42rem] md:pe-[18rem] ${isRtl ? "text-right" : "text-left"}`}>
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                  {lang === "en" ? "TRAVEL SERVICES" : lang === "ps" ? "د سفر خدمتونه" : "خدمات سفر"}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-black leading-[1.35] text-white md:text-5xl md:leading-tight">
                  {content.title}
                </h1>
                <p className="mt-4 max-w-[36rem] text-pretty text-sm leading-7 text-white/85 md:text-base md:leading-8">
                  {content.subtitle}
                </p>
                <div className={`mt-6 ${isRtl ? "flex justify-end" : "flex justify-start"}`}>
                  <ConsultButton
                    label={content.action}
                    className="rounded-xl px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:absolute md:end-0 md:top-1/2 md:mt-0 md:w-64 md:-translate-y-1/2 md:grid-cols-1 md:gap-4">
                {[
                  { icon: Shield, label: lang === "en" ? "Visa guidance" : lang === "ps" ? "د ویزې لارښوونه" : "راهنمایی ویزا" },
                  { icon: Plane, label: lang === "en" ? "Flight booking" : lang === "ps" ? "د الوتنې ټکټ" : "تهیه بلیط پرواز" },
                  { icon: Globe, label: lang === "en" ? "Multilingual support" : lang === "ps" ? "څو ژبنی ملاتړ" : "پشتیبانی چندزبانه" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="motion-card flex min-h-14 items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-xs font-semibold text-white backdrop-blur-sm md:gap-3 md:px-4 md:text-sm"
                  >
                    <Icon className="motion-card-icon h-4 w-4 shrink-0 text-cyan-100 md:h-5 md:w-5" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Highlight Section */}
          <section className="rounded-[32px] bg-white p-8 shadow-xl md:p-12">
            <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                <Heart className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {content.highlight}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
                  {content.highlightText}
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              {content.items.map((item) => (
                <div
                  key={item.title}
                  className="motion-card group overflow-hidden rounded-[24px] border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg ring-1 ring-slate-200/50"
                >
                  <div className="motion-card-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900 md:text-xl group-hover:text-[#0dadd1] transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
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
