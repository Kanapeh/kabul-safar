"use client";

import Image from "next/image";
import { Check, Clock, Globe, Heart, Quote, Shield } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { CtaPromo } from "@/sections/cta-promo";
import { Testimonials } from "@/sections/testimonials";

const pageText = {
  fa: {
    heading: "کابل سفر، مسیر مهاجرین را ساده می‌کند",
    description:
      "کابل سفر به خوبی نیاز روزافزون مهاجرین به مسافرت امن و پروسهٔ پیچیده دریافت بلیط را درک می‌کند. ما تلاش می‌کنیم سفر شما را از هر نقطهٔ جهان با برنامه‌ای روشن، پشتیبانی سریع و هماهنگی کامل آسان‌تر کنیم.",
    highlightTitle: "چرا کابل سفر؟",
    highlightText:
      "ما می‌دانیم که مهاجرت فقط یک پرواز نیست؛ این یک تصمیم بزرگ زندگی است. هدف ما این است که این مسیر برای شما قابل اعتماد، ساده و قابل پیگیری باشد.",
    stats: [
      { value: "5000+", label: "مسافر راضی" },
      { value: "24/7", label: "پشتیبانی واتساپ" },
      { value: "98%", label: "رضایت مشتری" },
    ],
    features: [
      {
        title: "ساده‌سازی ویزا",
        description:
          "فرآیندهای پیچیده ویزا را برای مهاجرین با پشتیبانی مرحله‌به‌مرحله ساده می‌کنیم.",
        icon: Shield,
      },
      {
        title: "رزرو بلیط سریع",
        description:
          "با دسترسی به بهترین مسیرها، خرید بلیط و هماهنگی سفر شما را سریع می‌کنیم.",
        icon: Clock,
      },
      {
        title: "همراه جهانی",
        description:
          "مهاجرین از سراسر دنیا می‌توانند روی پشتیبانی واتساپ و پاسخ‌گویی ۲۴ ساعته ما حساب کنند.",
        icon: Globe,
      },
      {
        title: "خدمت با عشق",
        description:
          "ما با عشق و تعهد به خدمت شما، بهترین تجربه سفر را فراهم می‌کنیم.",
        icon: Heart,
      },
    ],
    quote:
      "کابل سفر می‌فهمد که هر سفر مهاجرتی نیاز به آرامش، سرعت و شفافیت دارد. ما این مسیر را برای شما قابل‌اعتمادتر می‌کنیم.",
    quoteBy: "تیم کابل سفر",
    impact: [
      "پشتیبانی واتساپ برای مهاجرین در هر ساعت",
      "هماهنگی سریع بلیط و ویزا برای مسیرهای بین‌المللی",
      "پیگیری کامل تا زمان حرکت و رسیدن به مقصد",
    ],
  },
  en: {
    heading: "Kabul Safar simplifies migrant journeys",
    description:
      "Kabul Safar understands the rising need of migrants for secure travel and the complexity of ticketing. We make visa, ticket, and migration travel easier from anywhere in the world.",
    highlightTitle: "Why Kabul Safar?",
    highlightText:
      "Migration is more than a ticket. It is a life decision, and we make that journey smoother with clear guidance and trusted support.",
    stats: [
      { value: "5000+", label: "Happy travelers" },
      { value: "24/7", label: "WhatsApp support" },
      { value: "98%", label: "Customer satisfaction" },
    ],
    features: [
      {
        title: "Visa made simple",
        description:
          "We simplify complex visa steps with clear, step-by-step guidance.",
        icon: Shield,
      },
      {
        title: "Fast ticketing",
        description:
          "We source the best routes and book your flights quickly and reliably.",
        icon: Clock,
      },
      {
        title: "Global support",
        description:
          "Migrants worldwide rely on our WhatsApp support and 24/7 assistance.",
        icon: Globe,
      },
      {
        title: "Service with love",
        description:
          "We serve with love and commitment to provide the best travel experience.",
        icon: Heart,
      },
    ],
    quote:
      "Kabul Safar knows migration is not just a flight. It is a life change, and we make it more reliable and easier for you.",
    quoteBy: "The Kabul Safar team",
    impact: [
      "WhatsApp support for migrants anytime",
      "Fast ticket and visa coordination worldwide",
      "Full assistance until departure and arrival",
    ],
  },
  ps: {
    heading: "کابل سفر د کډوالو سفر اسانوي",
    description:
      "کابل سفر د کډوالو د سفري اړتیاوو او د ټکټ اخیستلو د پیچلتیا کامل درک لري. موږ د ویزې، ټکټ او مهاجرت سفرونه د نړۍ له هر ځایه آسانه کوو.",
    highlightTitle: "ولې کابل سفر؟",
    highlightText:
      "مهاجرې یوازې یوه الوتنه نه ده. دا د ژوند بدلونه انتخاب دی او موږ هغه سفر ستاسو لپاره اسانه کوو.",
    stats: [
      { value: "5000+", label: "خوشحاله مسافر" },
      { value: "24/7", label: "واتساپ ملاتړ" },
      { value: "98%", label: "د مشتری رضایت" },
    ],
    features: [
      {
        title: "ویزه ساده کول",
        description:
          "موږ د پیچلو ویزې مرحلو لپاره واضح او ګام په ګام لارښود وړاندې کوو.",
        icon: Shield,
      },
      {
        title: "چټک ټکټونه",
        description:
          "موږ غوره لارې پیدا کوو او ستاسو الوتنې په چټکۍ او اطمینان سره بک کوو.",
        icon: Clock,
      },
      {
        title: "نړیوال ملاتړ",
        description:
          "د نړۍ له ګوټ ګوټ څخه مهاجرین زموږ په ۲۴/۷ واتساپ ملاتړ تکیه کوي.",
        icon: Globe,
      },
      {
        title: "خدمت سره مینې",
        description:
          "موږ د مینې او تعهد سره خدمت کوو ترڅو غوره سفر تجربه ورکړو.",
        icon: Heart,
      },
    ],
    quote:
      "کابل سفر پوهیږي چې مهاجرت یوازې یو سفر نه دی؛ دا د ژوند بدلون دی. موږ دا لاره ستاسو لپاره باوري او ساده کوو.",
    quoteBy: "د کابل سفر ټیم",
    impact: [
      "د مهاجرو لپاره هر وخت واتساپ ملاتړ",
      "د نړۍ په کچه چټک ټکټ او ویزه همغږي",
      "تر تګ او رسیدو پورې بشپړ مرسته",
    ],
  },
};

export default function AboutPage() {
  const { lang } = useI18n();
  const content = pageText[lang] ?? pageText.fa;

  const ui =
    lang === "en"
      ? { eyebrow: "About Kabul Safar", cta: "Talk to our team", impact: "What you can count on", why: "Our values" }
      : lang === "ps"
        ? { eyebrow: "د کابل سفر په اړه", cta: "زموږ له ټیم سره خبرې وکړئ", impact: "په څه حساب کولی شئ", why: "زموږ ارزښتونه" }
        : { eyebrow: "درباره کابل سفر", cta: "گفتگو با تیم ما", impact: "روی چه چیزی می‌توانید حساب کنید", why: "ارزش‌های ما" };

  return (
    <PageShell>
      <PageHero
        eyebrow={ui.eyebrow}
        title={content.heading}
        subtitle={content.description}
        actions={
          <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" className="ks-btn ks-btn-primary py-4 sm:px-7">
            <WhatsAppIcon className="h-5 w-5" />
            {ui.cta}
          </a>
        }
        aside={
          <div className="relative mx-auto h-[260px] w-full max-w-[380px] md:h-[340px]">
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[32px] border-4 border-white shadow-[0_24px_48px_-24px_rgba(25,34,56,0.55)]">
              <Image src="/images/bamiyan.jpg" alt="" fill sizes="380px" className="object-cover" priority />
            </div>
            <div className="absolute -bottom-3 start-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2.5 shadow-lg rtl:translate-x-1/2">
              <Image src="/images/Kabul%20safar%20logo.jpg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
              <span className="whitespace-nowrap text-sm font-extrabold text-ink">{lang === "en" ? "Kabul Safar" : "کابل سفر"}</span>
            </div>
          </div>
        }
      />

      <section aria-label={content.highlightTitle}>
        <ul className="grid grid-cols-3 gap-2 rounded-[24px] bg-navy p-2 md:gap-3 md:p-3">
          {content.stats.map((stat) => (
            <li key={stat.label} className="rounded-[18px] bg-white/5 px-2 py-5 text-center md:py-7">
              <p className="text-2xl font-black text-amber md:text-4xl" dir="ltr">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium leading-5 text-white/70 md:text-sm">{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-why" className="space-y-6">
        <SectionHeading id="about-why" eyebrow={ui.why} title={content.highlightTitle} subtitle={content.highlightText} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.features.map((feature, idx) => (
            <li key={feature.title}>
              <ScrollReveal className="h-full" delayMs={idx * 70}>
                <article className="ks-card motion-card h-full p-6">
                  <span className="motion-card-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{feature.description}</p>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <figure className="relative overflow-hidden rounded-[28px] bg-amber-soft/80 p-7 md:p-10">
          <Quote className="h-10 w-10 text-amber" aria-hidden="true" />
          <blockquote className="mt-4 text-xl font-extrabold leading-[1.8] text-ink md:text-2xl">
            {content.quote}
          </blockquote>
          <figcaption className="mt-5 text-sm font-bold text-muted">— {content.quoteBy}</figcaption>
        </figure>

        <div className="ks-card p-7 md:p-8">
          <h2 className="text-lg font-extrabold text-ink">{ui.impact}</h2>
          <ul className="mt-5 space-y-4">
            {content.impact.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <CtaPromo />
    </PageShell>
  );
}
