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

  return (
    <nav
      aria-label={
        lang === "fa"
          ? "ناوبری موبایل"
          : lang === "ps"
            ? "ګرځنده نیویګیشن"
            : "Mobile navigation"
      }
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.35rem)] pt-1.5 shadow-[0_-8px_28px_rgba(25,34,56,0.1)] backdrop-blur-2xl md:hidden"
    >
      <div className="grid grid-cols-5 items-end gap-1">
        {navItems.slice(0, 2).map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 text-[#022d37]"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}
        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="واتساپ کابل سفر"
          className="-mt-7 flex min-h-[4.25rem] flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 text-[10px] font-semibold text-[#16883d] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16883d] text-white shadow-[0_6px_18px_rgba(22,136,61,0.3)] ring-4 ring-white">
            <WhatsAppIcon className="h-7 w-7" />
          </span>
          <span className="max-w-full truncate leading-none">
            {lang === "fa" ? "واتساپ" : lang === "ps" ? "واټس‌اپ" : "WhatsApp"}
          </span>
        </a>
        {navItems.slice(2).map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 text-[#022d37]"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
