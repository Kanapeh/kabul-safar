import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
  cover_image: string | null;
  created_at: string;
  published_at?: string | null;
  content?: string | null;
  language?: string | null;
};

export type BlogLang = "fa" | "en" | "ps";

export const readingMinutes = (html?: string | null) => {
  const words = (html ?? "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const formatPostDate = (value: string, lang: BlogLang) =>
  new Date(value).toLocaleDateString(lang === "en" ? "en-GB" : "fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const minutesLabel = (n: number, lang: BlogLang) =>
  lang === "en" ? `${n} min read` : lang === "ps" ? `${n.toLocaleString("fa-IR")} دقیقې` : `${n.toLocaleString("fa-IR")} دقیقه مطالعه`;

const generalLabel = (lang: BlogLang) => (lang === "en" ? "General" : lang === "ps" ? "عمومي" : "عمومی");

export function PostCard({
  article,
  lang,
  featured = false,
}: {
  article: BlogArticle;
  lang: BlogLang;
  featured?: boolean;
}) {
  const date = formatPostDate(article.published_at || article.created_at, lang);
  const minutes = readingMinutes(article.content);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`ks-card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_24px_48px_-28px_rgba(25,34,56,0.45)] ${
        featured ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-canvas ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[340px]" : "aspect-[16/10]"}`}>
        <Image
          src={article.cover_image || "/images/destination.jpg"}
          alt=""
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 100vw, 380px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal shadow-sm">
          {article.category || generalLabel(lang)}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:justify-center md:p-9" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {minutesLabel(minutes, lang)}
          </span>
        </div>
        <h3
          className={`mt-3 font-extrabold leading-[1.6] text-ink transition-colors group-hover:text-teal ${
            featured ? "text-xl md:text-[28px] md:leading-[1.5]" : "line-clamp-2 text-lg"
          }`}
        >
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className={`mt-2 text-sm leading-7 text-muted ${featured ? "line-clamp-3 md:text-base md:leading-8" : "line-clamp-2"}`}>
            {article.excerpt}
          </p>
        ) : null}
        {article.author ? (
          <div className="mt-auto flex items-center gap-2 pt-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
              {article.author.charAt(0)}
            </span>
            <span className="text-sm font-semibold text-ink">{article.author}</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
