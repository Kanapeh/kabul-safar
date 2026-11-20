"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "همه نوشته‌ها", icon: FileText, exact: true },
  { href: "/admin/articles/new", label: "افزودن نوشته", icon: FilePlus2, exact: true },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    pathname === href || (href === "/admin" && pathname.startsWith("/admin/articles/") && !pathname.endsWith("/new"));

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
        <Image
          src="/images/Kabul%20safar%20logo.jpg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl bg-white object-contain"
        />
        <span>
          <span className="block text-sm font-extrabold text-white">کابل سفر</span>
          <span className="block text-[11px] text-white/50">پیشخوان مدیریت</span>
        </span>
      </Link>

      <nav className="mt-2 flex-1 space-y-5 px-3" aria-label="منوی مدیریت">
        <div>
          <p className="mb-1.5 flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-wide text-white/40">
            <LayoutDashboard className="h-3.5 w-3.5" />
            نوشته‌ها
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      active ? "bg-teal text-white" : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-wide text-white/40">سایت</p>
          <ul className="space-y-1">
            <li>
              <a
                href="/blog"
                target="_blank"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-white/5 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                مشاهده وبلاگ
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-red-500/15 hover:text-red-200"
        >
          <LogOut className="h-4 w-4" />
          خروج
        </button>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-canvas text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-60 bg-navy lg:block">{sidebar}</aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-3 text-white lg:hidden">
        <span className="text-sm font-extrabold">پیشخوان کابل سفر</span>
        <button
          type="button"
          aria-label="منو"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside
            className="absolute inset-y-0 start-0 w-64 bg-navy"
            onClick={(e) => {
              e.stopPropagation()
              if ((e.target as HTMLElement).closest("a")) setMobileOpen(false)
            }}
          >
            <button
              type="button"
              aria-label="بستن"
              onClick={() => setMobileOpen(false)}
              className="absolute end-3 top-5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="lg:ps-60">
        <main className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
