"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Plane,
  Shield,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { HowItWorks } from "@/sections/how-it-works";
import { Faq } from "@/sections/faq";
import { CtaPromo } from "@/sections/cta-promo";

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
          "دریافت ویزای ایران برای شهروندان افغان با پشتیبانی کامل و سریع.",
        icon: Shield,
      },
      {
        title: "ویزای ترکیه",
        description:
          "اخذ ویزای ترکیه با راهنمایی تخصصی و پشتیبانی در تمام مراحل.",
        icon: Shield,
      },
      {
        title: "ویزای سایر کشورها",
        description:
          "راهنمایی، بررسی مدارک و پیگیری درخواست ویزا برای کشورهای دیگر بر اساس مقصد شما.",
        icon: Globe,
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
          "پروازهای معتبر و مطمئن با بهترین قیمت‌ها به هر مقصدی در دنیا.",
        icon: Plane,
      },
      {
        title: "پشتیبانی واتساپ ۲۴/۷",
        description: "پاسخ سریع و همراهی کامل با شما در هر مرحله از سفر.",
        icon: MessageCircle,
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
        title: "Visas for other countries",
        description:
          "Guidance, document review and application follow-up for visas to other destinations.",
        icon: Globe,
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
          "Reliable flights with the best prices to any destination worldwide.",
        icon: Plane,
      },
      {
        title: "24/7 WhatsApp support",
        description:
          "Fast responses and full assistance at every stage of your trip.",
        icon: MessageCircle,
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
        title: "د نورو هېوادونو ویزه",
        description:
          "ستاسو د منزل له مخې د نورو هېوادونو د ویزې لارښوونه، د اسنادو کتنه او تعقیب.",
        icon: Globe,
      },
      {
        title: "حج او عمره",
        description:
          "د حج او عمرې لپاره بشپړ خدمتونه د مسلکي لارښوونې او بشپړ ملاتړ سره.",
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
        description: "نړۍ هر منزل ته باوري الوتنې د غوره بیو سره.",
        icon: Plane,
      },
      {
        title: "۲۴/۷ واتساپ ملاتړ",
        description: "چټک ځوابونه او بشپړ مرسته په هر پړاو کې.",
        icon: MessageCircle,
      },
    ],
  },
};

export default function ServicesPage() {
  const { lang } = useI18n();
  const content = pageText[lang] ?? pageText.fa;
  const isRtl = lang !== "en";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const ui =
    lang === "en"
      ? { eyebrow: "Travel services", flights: "Search flights", listEyebrow: "What we do", listTitle: "Our services", ask: "Ask on WhatsApp", hello: "Hello, I'd like information about:" }
      : lang === "ps"
        ? { eyebrow: "د سفر خدمتونه", flights: "الوتنه ولټوئ", listEyebrow: "موږ څه کوو", listTitle: "زموږ خدمتونه", ask: "په واټساپ کې وپوښتئ", hello: "سلام، د دې په اړه معلومات غواړم:" }
        : { eyebrow: "خدمات سفر", flights: "جستجوی پرواز", listEyebrow: "چه کاری انجام می‌دهیم", listTitle: "خدمات ما", ask: "درخواست در واتساپ", hello: "سلام، درباره این خدمت اطلاعات می‌خواهم:" };

  const highlights = [
    { icon: Shield, label: lang === "en" ? "Visa guidance" : lang === "ps" ? "د ویزې لارښوونه" : "راهنمایی ویزا" },
    { icon: Plane, label: lang === "en" ? "Flight booking" : lang === "ps" ? "د الوتنې ټکټ" : "تهیه بلیط پرواز" },
    { icon: Languages, label: lang === "en" ? "Dari, Pashto & English" : lang === "ps" ? "دري، پښتو او انګلیسي" : "دری، پشتو و انگلیسی" },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow={ui.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        actions={
          <>
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" className="ks-btn ks-btn-primary py-4 sm:px-7">
              <WhatsAppIcon className="h-5 w-5" />
              {content.action}
            </a>
            <Link href="/flights" className="ks-btn ks-btn-ghost py-4 sm:px-6">
              <Plane className="h-5 w-5 text-teal" aria-hidden="true" />
              {ui.flights}
            </Link>
          </>
        }
        aside={
          <div className="ks-card space-y-3 p-4 md:p-5">
            <div className="flex items-start gap-3 rounded-2xl bg-teal-soft/70 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-sm">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="text-start">
                <p className="font-extrabold text-ink">{content.highlight}</p>
                <p className="mt-1 text-sm leading-7 text-muted">{content.highlightText}</p>
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-2">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-line px-2 py-3 text-center">
                  <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
                  <span className="text-xs font-bold leading-5 text-ink">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section aria-labelledby="services-list" className="space-y-6">
        <SectionHeading id="services-list" eyebrow={ui.listEyebrow} title={ui.listTitle} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <li key={item.title}>
              <ScrollReveal className="h-full" delayMs={(index % 3) * 80}>
                <article className="ks-card motion-card group flex h-full flex-col p-6">
                  <span className="motion-card-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-extrabold text-ink">{item.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-7 text-muted">{item.description}</p>
                  <a
                    href={`${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(`${ui.hello} ${item.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 self-start rounded-xl text-sm font-bold text-teal transition-colors hover:text-ink"
                  >
                    {ui.ask}
                    <Arrow className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </section>

      <HowItWorks />
      <Faq />
      <CtaPromo />
    </PageShell>
  );
}
