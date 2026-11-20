"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { ArchVisual } from "@/components/arch-visual";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useI18n } from "@/components/i18n-provider";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_DISPLAY_FORMATTED,
  CONTACT_PHONE_DISPLAY_2_FORMATTED,
  CONTACT_PHONE_TEL,
  CONTACT_PHONE_TEL_2,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { Faq } from "@/sections/faq";

const pageText = {
  fa: {
    heading: "تماس با ما",
    description:
      "برای برنامه‌ریزی سفر و دریافت ویزا با دفترهای ما در فرانسه و سوئد تماس بگیرید. ما آماده پاسخگویی سریع و پشتیبانی حرفه‌ای هستیم.",
    contactTitle: "اطلاعات تماس",
    contactSubtitle:
      "دفاتر ما در فرانسه و سوئد آماده راهنمایی شما در مسیر سفر و ویزا هستند.",
    nameLabel: "نام کامل",
    emailLabel: "ایمیل",
    subjectLabel: "موضوع",
    messageLabel: "پیام شما",
    writePlaceholder: "پیام خود را اینجا بنویسید...",
    sendButton: "ارسال پیام",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "دفاتر ما",
    locationFrance: "پاریس، فرانسه",
    locationSweden: "استکهلم، سوئد",
  },
  en: {
    heading: "Get In Touch",
    description:
      "Contact our France and Sweden offices for travel planning, visa support, and fast WhatsApp assistance.",
    contactTitle: "Contact Information",
    contactSubtitle:
      "Our offices in France and Sweden are ready to help you with travel services and visa guidance.",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    writePlaceholder: "Write your message here...",
    sendButton: "Send Message",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "Our Offices",
    locationFrance: "Paris, France",
    locationSweden: "Stockholm, Sweden",
  },
  ps: {
    heading: "د موږ سره اړیکه",
    description:
      "د سفر پلان کولو، ویزې ملاتړ او چټک واتساپ خدمت لپاره زموږ د فرانسې او سویډن دفترونو سره اړیکه ونیسئ.",
    contactTitle: "د اړیکې معلومات",
    contactSubtitle:
      "زموږ دفترونه په فرانسه او سویډن کې ستاسو د سفر او ویزې ملاتړ لپاره چمتو دي.",
    nameLabel: "بشپړ نوم",
    emailLabel: "بریښنالیک",
    subjectLabel: "موضوع",
    messageLabel: "ستاسو پیغام",
    writePlaceholder: "خپل پیغام دلته ولیکئ...",
    sendButton: "پیغام واستوئ",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "زموږ دفترونه",
    locationFrance: "پاریس، فرانسه",
    locationSweden: "سټاکهولم، سویډن",
  },
};

export default function ContactPage() {
  const { lang } = useI18n();
  const content = pageText[lang] ?? pageText.fa;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const ui =
    lang === "en"
      ? {
          eyebrow: "Contact",
          whatsapp: "WhatsApp",
          whatsappHint: "Fastest way to reach us",
          phone: "Phone",
          email: "Email",
          formTitle: "Send us a message",
          formHint: "Your message opens in WhatsApp so our team can answer you right away.",
          required: "Please write your name and message.",
          france: "France",
          sweden: "Sweden",
        }
      : lang === "ps"
        ? {
            eyebrow: "اړیکه",
            whatsapp: "واټساپ",
            whatsappHint: "موږ ته د رسېدو تر ټولو چټکه لاره",
            phone: "تلیفون",
            email: "بریښنالیک",
            formTitle: "موږ ته پیغام ولیږئ",
            formHint: "ستاسو پیغام په واټساپ کې پرانیستل کېږي څو زموږ ټیم ژر ځواب درکړي.",
            required: "مهرباني وکړئ خپل نوم او پیغام ولیکئ.",
            france: "فرانسه",
            sweden: "سویډن",
          }
        : {
            eyebrow: "ارتباط با ما",
            whatsapp: "واتساپ",
            whatsappHint: "سریع‌ترین راه ارتباط با ما",
            phone: "تلفن",
            email: "ایمیل",
            formTitle: "برای ما پیام بفرستید",
            formHint: "پیام شما در واتساپ باز می‌شود تا تیم ما سریع پاسخ دهد.",
            required: "لطفاً نام و پیام خود را بنویسید.",
            france: "فرانسه",
            sweden: "سوئد",
          };

  const [error, setError] = useState("");

  const handleChange =
    (key: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [key]: event.target.value }));
      setError("");
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name.trim() || !message.trim()) {
      setError(ui.required);
      return;
    }
    const lines = [
      `${content.nameLabel}: ${name}`,
      email ? `${content.emailLabel}: ${email}` : "",
      subject ? `${content.subjectLabel}: ${subject}` : "",
      "",
      message,
    ].filter((line, i) => line !== "" || i === 3);
    window.open(`${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:border-teal focus:ring-4 focus:ring-teal/10";

  const methods = [
    {
      href: CONTACT_PHONE_TEL,
      icon: Phone,
      label: ui.phone,
      value: CONTACT_PHONE_DISPLAY_FORMATTED,
      ltr: true,
    },
    {
      href: CONTACT_PHONE_TEL_2,
      icon: Phone,
      label: ui.phone,
      value: CONTACT_PHONE_DISPLAY_2_FORMATTED,
      ltr: true,
    },
    {
      href: `mailto:${content.email}`,
      icon: Mail,
      label: ui.email,
      value: content.email,
      ltr: true,
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow={ui.eyebrow}
        title={content.heading}
        subtitle={content.description}
        aside={
          <ArchVisual
            src="/images/Kabul%20hero.jpg"
            badgeIcon={
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-soft text-navy">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
            }
            badge={<span dir="ltr">{CONTACT_PHONE_DISPLAY_FORMATTED}</span>}
          />
        }
      />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact methods */}
        <div className="space-y-4">
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] bg-navy p-5 text-white transition-colors hover:bg-navy-2 md:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1f9d55]">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold">{ui.whatsapp}</span>
              <span className="block text-sm text-white/85">{ui.whatsappHint}</span>
            </span>
            <span dir="ltr" className="hidden text-sm font-bold sm:block">
              {CONTACT_PHONE_DISPLAY_FORMATTED}
            </span>
          </a>

          <ul className="divide-y divide-line rounded-[20px] border border-line bg-white">
            {methods.map((m) => (
              <li key={m.value}>
                <a href={m.href} className="flex items-center gap-4 p-4 transition-colors hover:bg-canvas/60 md:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-soft text-navy">
                    <m.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-muted">{m.label}</span>
                    <span dir={m.ltr ? "ltr" : undefined} className="block truncate font-bold text-ink">
                      {m.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="rounded-[20px] bg-teal-soft p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
              <MapPin className="h-4 w-4 text-teal" aria-hidden="true" />
              {content.locationTitle}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {[
                { flag: "🇫🇷", city: content.locationFrance, country: ui.france },
                { flag: "🇸🇪", city: content.locationSweden, country: ui.sweden },
              ].map((office) => (
                <li key={office.city} className="rounded-2xl bg-white p-4">
                  <span className="text-2xl" aria-hidden="true">
                    {office.flag}
                  </span>
                  <p className="mt-2 text-sm font-bold text-ink">{office.city}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-[20px] border border-line bg-white p-5 md:p-8">
          <div>
            <h2 className="text-xl font-extrabold text-ink">{ui.formTitle}</h2>
            <p className="mt-1 text-sm leading-7 text-muted">{ui.formHint}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              {content.nameLabel} *
              <input type="text" autoComplete="name" className={fieldClass} value={formData.name} onChange={handleChange("name")} />
            </label>
            <label className="block text-sm font-semibold text-ink">
              {content.emailLabel}
              <input type="email" dir="ltr" autoComplete="email" className={fieldClass} value={formData.email} onChange={handleChange("email")} />
            </label>
          </div>
          <label className="block text-sm font-semibold text-ink">
            {content.subjectLabel}
            <input type="text" className={fieldClass} value={formData.subject} onChange={handleChange("subject")} />
          </label>
          <label className="block text-sm font-semibold text-ink">
            {content.messageLabel} *
            <textarea
              rows={5}
              className={`${fieldClass} resize-y leading-7`}
              placeholder={content.writePlaceholder}
              value={formData.message}
              onChange={handleChange("message")}
            />
          </label>

          {error ? (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <button type="submit" className="ks-btn ks-btn-primary w-full py-4 sm:w-auto sm:px-8">
            <Send className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            {content.sendButton}
          </button>
        </form>
      </section>

      <Faq />
    </PageShell>
  );
}
