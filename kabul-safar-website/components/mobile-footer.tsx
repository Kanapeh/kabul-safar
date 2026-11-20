"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BriefcaseBusiness, Headphones, Home } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getNavItems } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export const MobileFooter = () => {
  const pathname = usePathname();
  const { lang } = useI18n();
  const allItems = getNavItems(lang);
  const navItems = [
    { ...allItems[0], icon: Home },
    { ...allItems[1], icon: BriefcaseBusiness },
    { ...allItems[3], icon: BookOpen },
    { ...allItems[5], icon: Headphones },
  ];

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const renderItem = ({ href, label, icon: Icon }: (typeof navItems)[number]) => {
    const active = isActive(href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className="group flex flex-col items-center justify-center gap-1 py-1.5"
      >
        <span
          className={`flex h-9 w-12 items-center justify-center rounded-full transition-all duration-200 ${
            active
              ? "bg-navy text-white shadow-[0_6px_14px_-6px_rgba(25,34,56,0.6)]"
              : "text-muted group-hover:bg-canvas group-hover:text-ink"
          }`}
        >
          <Icon className="h-[19px] w-[19px]" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
        </span>
        <span
          className={`max-w-full truncate text-[10.5px] leading-none ${
            active ? "font-bold text-ink" : "font-medium text-muted"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <nav
      aria-label={
        lang === "fa" ? "ناوبری موبایل" : lang === "ps" ? "ګرځنده نیویګیشن" : "Mobile navigation"
      }
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] md:hidden"
    >
      <div className="pointer-events-auto mx-auto grid max-w-md grid-cols-5 items-end rounded-[26px] border border-white/70 bg-white/80 px-1.5 py-1 shadow-[0_16px_40px_-12px_rgba(25,34,56,0.35),0_2px_6px_rgba(25,34,56,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        {navItems.slice(0, 2).map(renderItem)}

        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={lang === "fa" ? "واتساپ کابل سفر" : "WhatsApp"}
          className="group -mt-7 flex flex-col items-center gap-1 pb-1.5"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#25d366] to-[#128c4b] text-white shadow-[0_10px_22px_-6px_rgba(18,140,75,0.6)] ring-[5px] ring-white/90 transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95">
            <WhatsAppIcon className="h-7 w-7" />
          </span>
          <span className="text-[10.5px] font-bold leading-none text-[#128c4b]">
            {lang === "fa" ? "واتساپ" : lang === "ps" ? "واټس‌اپ" : "WhatsApp"}
          </span>
        </a>

        {navItems.slice(2).map(renderItem)}
      </div>
    </nav>
  );
};
