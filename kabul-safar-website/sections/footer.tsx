"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import {
  CONTACT_PHONE_DISPLAY_FORMATTED,
  CONTACT_PHONE_DISPLAY_2_FORMATTED,
  CONTACT_PHONE_TEL,
  CONTACT_PHONE_TEL_2,
} from "@/lib/contact";
import { getFooterContent } from "@/lib/data";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kabulsafar?igsh=c3dwaDBldTM2OTdn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M16.5 7.5h.01" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/17xH3H7WbN/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@kabulsafar?si=BohGpBLBBrZ9dVqh",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <polygon points="10 9 16 12 10 15 10 9" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kabul.safar?_r=1&_t=ZN-97zx2im1yJK",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.750-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.020-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@kabulsafar28",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20a7.5 7.5 0 010-15" />
        <path d="M12 5.5c2.5 0 4.5 2 4.5 4.5 0 3-3 5-4.5 5-2 0-3-1-3-2.5" />
      </svg>
    ),
  },
];

const FooterLink = ({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) =>
  /^(https?:|mailto:|tel:)/.test(href) ? (
    <a
      href={href}
      className={className}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );

export const Footer = () => {
  const { lang } = useI18n();
  const content = getFooterContent(lang);
  const labels =
    lang === "en"
      ? { brand: "Kabul Safar", tagline: "Visa & travel services", follow: "Follow us", rights: "All rights reserved." }
      : lang === "ps"
        ? { brand: "کابل سفر", tagline: "ویزه او د سفر خدمتونه", follow: "موږ تعقیب کړئ", rights: "ټول حقونه خوندي دي." }
        : { brand: "کابل سفر", tagline: "ویزا و خدمات سفر", follow: "ما را دنبال کنید", rights: "تمامی حقوق محفوظ است." };

  const [openGroup, setOpenGroup] = useState<number | null>(null);

  return (
    <footer id="contact" className="mt-12 rounded-t-[32px] bg-navy px-5 pb-8 pt-10 text-white md:px-10 md:pt-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Kabul%20safar%20logo.jpg"
              alt="Kabul Safar"
              width={64}
              height={64}
              className="h-14 w-14 rounded-2xl bg-white object-contain"
            />
            <div>
              <p className="text-lg font-extrabold">{labels.brand}</p>
              <p className="text-xs text-white/60">{labels.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/70">{content.blurb}</p>

          <div className="flex flex-wrap gap-2">
            {[
              { href: CONTACT_PHONE_TEL, label: content.phone || CONTACT_PHONE_DISPLAY_FORMATTED },
              { href: CONTACT_PHONE_TEL_2, label: CONTACT_PHONE_DISPLAY_2_FORMATTED },
            ].map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                <span dir="ltr">{phone.label}</span>
              </a>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-white/60">{labels.follow}</p>
            <div className="mt-2 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        {/* Mobile: accordion */}
        <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:hidden">
          {content.groups.map((group, index) => {
            const isOpen = openGroup === index;
            const panelId = `footer-group-${index}`;
            return (
              <nav key={group.title} aria-label={group.title}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-4 py-4 text-[15px] font-extrabold text-white"
                  >
                    {group.title}
                    <ChevronDown
                      className={`h-4 w-4 text-white/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div id={panelId} className="ks-collapse" data-open={isOpen}>
                  <div>
                    <ul className="grid grid-cols-2 gap-2 px-4 pb-4">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <FooterLink
                            href={link.href}
                            label={link.label}
                            className="flex min-h-11 items-center rounded-xl bg-white/5 px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>
            );
          })}
        </div>

        {/* Tablet & desktop: columns */}
        <div className="hidden gap-8 md:grid md:grid-cols-3">
          {content.groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-extrabold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-1.5 border-t border-white/10 pt-5 text-center text-xs text-white/45 md:mt-10 md:flex-row">
        <p>
          © {new Date().getFullYear()} {labels.brand} — {labels.rights}
        </p>
        <a
          href="https://www.linkedin.com/in/sepantaalizadeh/"
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          {content.designer}
        </a>
      </div>
    </footer>
  );
};
