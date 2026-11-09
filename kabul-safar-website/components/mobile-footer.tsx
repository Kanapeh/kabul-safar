"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BriefcaseBusiness, Home, Info, Plane } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getNavItems } from "@/lib/data";

export const MobileFooter = () => {
  const pathname = usePathname();
  const { lang } = useI18n();
  const allItems = getNavItems(lang);
  const navItems = [
    { ...allItems[0], icon: Home },
    { ...allItems[1], icon: BriefcaseBusiness },
    { ...allItems[2], icon: Plane },
    { ...allItems[3], icon: BookOpen },
    { ...allItems[4], icon: Info },
  ];

  return (
    <nav
      aria-label={lang === "fa" ? "ناوبری موبایل" : lang === "ps" ? "ګرځنده نیویګیشن" : "Mobile navigation"}
      className="fixed inset-x-3 bottom-[max(env(safe-area-inset-bottom),0.5rem)] z-40 rounded-2xl border border-slate-200 bg-white/95 px-1 py-2 shadow-lg shadow-slate-900/10 backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? "bg-[#e8f7fa] text-[#141d2b]"
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
