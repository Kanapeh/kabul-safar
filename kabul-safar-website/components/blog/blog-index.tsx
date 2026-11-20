"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/components/i18n-provider";
import { PostCard, type BlogArticle } from "@/components/blog/post-card";

const PAGE_SIZE = 9;

export function BlogIndex() {
  const { lang } = useI18n();
  const [all, setAll] = useState<BlogArticle[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const ui =
    lang === "en"
      ? { search: "Search articles…", all: "All", empty: "No articles published yet.", noMatch: "No articles match your search.", more: "Load more", error: "Could not load articles. Please refresh." }
      : lang === "ps"
        ? { search: "لیکنې ولټوئ…", all: "ټول", empty: "لا تر اوسه کومه لیکنه نه ده خپره شوې.", noMatch: "ستاسو د لټون سره سمه لیکنه ونه موندل شوه.", more: "نورې لیکنې", error: "لیکنې پورته نه شوې. پاڼه بیا پرانیزئ." }
        : { search: "جستجو در مقالات…", all: "همه", empty: "هنوز مقاله‌ای منتشر نشده است.", noMatch: "مقاله‌ای با این جستجو پیدا نشد.", more: "مقالات بیشتر", error: "بارگذاری مقالات ممکن نشد. صفحه را دوباره باز کنید." };

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("articles")
      .select("id,title,slug,excerpt,category,author,cover_image,created_at,published_at,content,language")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Error fetching articles:", error);
          setStatus("error");
          return;
        }
        setAll((data as BlogArticle[]) ?? []);
        setStatus("ready");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Articles in the current language; fall back to everything if there are none yet.
  const articles = useMemo(() => {
    const inLang = all.filter((a) => (a.language || "fa") === lang);
    return inLang.length ? inLang : all;
  }, [all, lang]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) => a.category && counts.set(a.category, (counts.get(a.category) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (!category || a.category === category) &&
        (!q || `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q)),
    );
  }, [articles, category, query]);

  const isFiltering = Boolean(query.trim() || category);
  const [featured, ...rest] = filtered;
  const gridItems = isFiltering ? filtered : rest;
  const shown = gridItems.slice(0, visibleCount);

  return (
    <section className="space-y-6" aria-label={lang === "en" ? "Articles" : "مقالات"}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="ks-scroll-x -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          {[["", articles.length] as [string, number], ...categories].map(([name, count]) => {
            const active = category === name;
            return (
              <button
                key={name || "all"}
                type="button"
                onClick={() => {
                  setCategory(name);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active ? "bg-navy text-white" : "border border-line bg-white text-ink hover:bg-canvas"
                }`}
              >
                {name || ui.all}
                <span className={`ms-1.5 text-xs ${active ? "text-white/70" : "text-muted"}`}>
                  {lang === "en" ? count : count.toLocaleString("fa-IR")}
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">{ui.search}</span>
          <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder={ui.search}
            className="w-full rounded-2xl border border-line bg-white py-3 pe-4 ps-10 text-sm text-ink outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10"
          />
        </label>
      </div>

      {status === "loading" ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="ks-card overflow-hidden">
              <div className="aspect-[16/10] animate-pulse bg-canvas" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 animate-pulse rounded bg-canvas" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-canvas" />
                <div className="h-3 w-full animate-pulse rounded bg-canvas" />
              </div>
            </div>
          ))}
        </div>
      ) : status === "error" ? (
        <p className="ks-card p-10 text-center text-sm text-red-600">{ui.error}</p>
      ) : filtered.length === 0 ? (
        <div className="ks-card flex flex-col items-center gap-3 p-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-muted">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-muted">{articles.length === 0 ? ui.empty : ui.noMatch}</p>
        </div>
      ) : (
        <>
          {!isFiltering && featured ? <PostCard article={featured} lang={lang} featured /> : null}
          {shown.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((article) => (
                <li key={article.id}>
                  <PostCard article={article} lang={lang} />
                </li>
              ))}
            </ul>
          ) : null}
          {gridItems.length > visibleCount ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="ks-btn ks-btn-ghost px-8"
              >
                {ui.more}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
