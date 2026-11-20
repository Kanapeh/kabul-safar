"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supportedLangs } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={t("header.lang")}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-ink transition-colors hover:bg-canvas"
      >
        <Globe className="h-4 w-4 text-teal" aria-hidden="true" />
        <span className="text-xs font-semibold">
          {supportedLangs.find((l) => l.id === lang)?.label || lang}
        </span>
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      <div
        className={`absolute end-0 top-12 z-40 min-w-28 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-xl transition-all ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {supportedLangs.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => {
              setLang(l.id);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas ${l.id === lang ? "bg-teal-soft text-teal" : "text-ink"
              }`}
          >
            <span>{l.label}</span>
            <span className="text-[10px] text-slate-400">{l.dir.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

