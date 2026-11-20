"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BriefcaseBusiness,
  Headphones,
  Home,
  Info,
  ChevronLeft,
  ChevronRight,
  Menu,
  Phone,
  Plane,
  X,
} from "lucide-react";
import { LanguageSwitch } from "@/components/language-switch";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { getNavItems } from "@/lib/data";
import { useI18n } from "@/components/i18n-provider";
import {
  CONTACT_PHONE_DISPLAY_FORMATTED,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const navIcons = [Home, BriefcaseBusiness, Plane, BookOpen, Info, Headphones];

export const Header = () => {
  const { isOpen, toggle, close } = useMobileMenu();
  const { lang } = useI18n();
  const pathname = usePathname();
  const navItems = getNavItems(lang);

  const labels =
    lang === "en"
      ? {
          brand: "Kabul Safar",
          tagline: "Visa & travel services",
          cta: "Free consultation",
          menu: "Menu",
          close: "Close menu",
          hello: "Where would you like to go?",
          helloSub: "Visa, flights and travel advice — all in one place.",
        }
      : lang === "ps"
        ? {
            brand: "کابل سفر",
            tagline: "ویزه او د سفر خدمتونه",
            cta: "وړیا مشوره",
            menu: "مینو",
            close: "مینو وتړئ",
            hello: "غواړئ چېرته سفر وکړئ؟",
            helloSub: "ویزه، الوتنه او د سفر مشوره — ټول په یوه ځای کې.",
          }
        : {
            brand: "کابل سفر",
            tagline: "ویزا و خدمات سفر",
            cta: "مشاوره رایگان",
            menu: "منو",
            close: "بستن منو",
            hello: "به کجا سفر می‌کنید؟",
            helloSub: "ویزا، بلیط و مشاوره سفر — همه در یک جا.",
          };

  const Chevron = lang === "en" ? ChevronRight : ChevronLeft;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <header id="home" className="sticky top-2 z-30">
      <nav
        aria-label={labels.menu}
        className="flex items-center justify-between gap-3 rounded-[20px] border border-line bg-white/90 py-2 ps-2 pe-2 shadow-[0_8px_24px_-18px_rgba(30,45,51,0.35)] backdrop-blur-xl md:rounded-3xl md:py-2.5 md:ps-3 md:pe-3"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label={labels.brand}
        >
          <Image
            src="/images/Kabul%20safar%20logo.jpg"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 shrink-0 rounded-2xl border border-line bg-white object-contain md:h-12 md:w-12"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-base font-extrabold text-ink md:text-lg">
              {labels.brand}
            </span>
            <span className="block truncate text-[11px] font-medium text-muted md:text-xs">
              {labels.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-teal-soft text-teal"
                    : "text-ink/75 hover:bg-canvas hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="ks-btn ks-btn-primary hidden rounded-xl px-4 py-2.5 text-sm md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {labels.cta}
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={labels.menu}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors hover:bg-canvas lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              dir={lang === "en" ? "ltr" : "rtl"}
              className="ks-backdrop-in fixed inset-0 z-[60] bg-navy/35 backdrop-blur-[6px] lg:hidden"
              onClick={close}
            >
              <aside
                role="dialog"
                aria-modal="true"
                aria-label={labels.menu}
                className="ks-drawer-in absolute inset-y-3 start-3 flex w-[min(84vw,340px)] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(25,34,56,0.55)]"
                onClick={(event) => event.stopPropagation()}
              >
                {/* Brand header */}
                <div className="relative overflow-hidden bg-navy px-5 pb-6 pt-5 text-white">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -end-10 -top-16 h-44 w-44 rounded-full bg-teal/50 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -start-8 h-40 w-40 rounded-full bg-amber/30 blur-3xl"
                  />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/Kabul%20safar%20logo.jpg"
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-2xl bg-white object-contain p-0.5"
                      />
                      <div className="leading-tight">
                        <p className="text-base font-extrabold">{labels.brand}</p>
                        <p className="mt-0.5 text-xs text-white/60">{labels.tagline}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={labels.close}
                      onClick={close}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="relative mt-5 text-[15px] font-bold leading-7">{labels.hello}</p>
                  <p className="relative text-xs leading-6 text-white/65">{labels.helloSub}</p>
                </div>

                {/* Navigation */}
                <nav className="-mt-3 flex-1 overflow-y-auto rounded-t-[24px] bg-white px-3 pb-3 pt-4">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => {
                      const Icon = navIcons[index] ?? Home;
                      const active = isActive(item.href);
                      return (
                        <li
                          key={item.href}
                          className="ks-stagger-in"
                          style={{ animationDelay: `${80 + index * 35}ms` }}
                        >
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={active ? "page" : undefined}
                            className={`group flex items-center gap-3 rounded-2xl p-2 pe-3 text-[15px] font-semibold transition-colors ${
                              active ? "bg-teal-soft text-ink" : "text-ink/85 hover:bg-canvas"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                active
                                  ? "bg-teal text-white"
                                  : "bg-canvas text-muted group-hover:bg-white group-hover:text-teal"
                              }`}
                            >
                              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                            </span>
                            <span className="flex-1">{item.label}</span>
                            <Chevron
                              className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
                                active ? "text-teal" : "text-muted/50"
                              }`}
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Contact */}
                <div className="space-y-2 border-t border-line bg-canvas/60 p-4">
                  <a
                    href={CONTACT_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="ks-btn ks-btn-whatsapp w-full py-3.5"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {labels.cta}
                  </a>
                  <a
                    href={CONTACT_PHONE_TEL}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3 text-sm font-bold text-ink transition-colors hover:bg-canvas"
                  >
                    <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
                    <span dir="ltr">{CONTACT_PHONE_DISPLAY_FORMATTED}</span>
                  </a>
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
};
