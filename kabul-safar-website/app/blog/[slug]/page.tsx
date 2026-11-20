import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PageShell } from "@/components/page-shell";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  PostCard,
  formatPostDate,
  readingMinutes,
  type BlogArticle,
  type BlogLang,
} from "@/components/blog/post-card";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

interface Article extends BlogArticle {
  content: string;
}

async function getPublishedArticle(slug: string): Promise<Article | null> {
  const decoded = (() => {
    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  })();
  const candidates = [
    ...new Set([
      slug,
      decoded,
      slug.normalize("NFC"),
      decoded.normalize("NFC"),
      decoded.replace(/\s+/g, "-").normalize("NFC"),
    ]),
  ];

  for (const candidate of candidates) {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", candidate)
      .eq("status", "published")
      .maybeSingle();

    if (data) return data;
  }

  return null;
}

async function getRelated(article: Article): Promise<BlogArticle[]> {
  let query = supabase
    .from("articles")
    .select("id,title,slug,excerpt,category,author,cover_image,created_at,published_at,content,language")
    .eq("status", "published")
    .neq("id", article.id)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(3);
  if (article.category) query = query.eq("category", article.category);
  const { data } = await query;
  if (data && data.length) return data as BlogArticle[];

  const { data: latest } = await supabase
    .from("articles")
    .select("id,title,slug,excerpt,category,author,cover_image,created_at,published_at,content,language")
    .eq("status", "published")
    .neq("id", article.id)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(3);
  return (latest as BlogArticle[]) ?? [];
}

const copy = {
  fa: { home: "خانه", blog: "بلاگ", general: "عمومی", minutes: (n: number) => `${n.toLocaleString("fa-IR")} دقیقه مطالعه`, share: "اشتراک‌گذاری:", copy: "کپی لینک", copied: "کپی شد", ctaTitle: "برای این سفر سوالی دارید؟", ctaBody: "کارشناسان کابل سفر در واتساپ پاسخ‌گوی شما هستند.", ctaBtn: "مشاوره رایگان در واتساپ", related: "مقالات مرتبط", author: "نویسنده" },
  ps: { home: "کور", blog: "بلاګ", general: "عمومي", minutes: (n: number) => `${n.toLocaleString("fa-IR")} دقیقې`, share: "شریکول:", copy: "لینک کاپي", copied: "کاپي شو", ctaTitle: "د دې سفر په اړه پوښتنه لرئ؟", ctaBody: "د کابل سفر کارپوهان په واټساپ کې ځواب درکوي.", ctaBtn: "په واټساپ کې وړیا مشوره", related: "اړوندې لیکنې", author: "لیکوال" },
  en: { home: "Home", blog: "Blog", general: "General", minutes: (n: number) => `${n} min read`, share: "Share:", copy: "Copy link", copied: "Copied", ctaTitle: "Questions about this trip?", ctaBody: "Kabul Safar's team answers on WhatsApp.", ctaBtn: "Free consultation on WhatsApp", related: "Related articles", author: "Author" },
} as const;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  const lang: BlogLang = article.language === "en" || article.language === "ps" ? article.language : "fa";
  const t = copy[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const Sep = dir === "rtl" ? ChevronLeft : ChevronRight;
  const related = await getRelated(article);
  const date = formatPostDate(article.published_at || article.created_at, lang);

  return (
    <PageShell>
      <article dir={dir} className="space-y-8 md:space-y-10">
        <header className="mx-auto max-w-[46rem] pt-4 text-center md:pt-8">
          <nav aria-label="breadcrumb" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-teal">{t.home}</Link>
            <Sep className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href="/blog" className="hover:text-teal">{t.blog}</Link>
            {article.category ? (
              <>
                <Sep className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-ink">{article.category}</span>
              </>
            ) : null}
          </nav>

          <span className="ks-eyebrow mt-6">{article.category || t.general}</span>
          <h1 className="mt-4 text-[28px] font-black leading-[1.55] text-ink md:text-[42px] md:leading-[1.45]">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-4 text-base leading-8 text-muted md:text-lg md:leading-9">{article.excerpt}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {article.author ? (
              <span className="inline-flex items-center gap-2 font-semibold text-ink">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                  {article.author.charAt(0)}
                </span>
                {article.author}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {t.minutes(readingMinutes(article.content))}
            </span>
          </div>
        </header>

        {article.cover_image ? (
          <div className="relative mx-auto aspect-[16/9] max-w-[64rem] overflow-hidden rounded-[28px] bg-canvas md:rounded-[36px]">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="ks-card mx-auto max-w-[50rem] px-5 py-8 md:px-14 md:py-12">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
            <ShareButtons title={article.title} labels={{ share: t.share, copy: t.copy, copied: t.copied }} />
            {article.author ? (
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {article.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-xs text-muted">{t.author}</span>
                  <span className="block font-bold text-ink">{article.author}</span>
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="mx-auto flex max-w-[50rem] flex-col items-center gap-4 rounded-[28px] bg-navy p-7 text-center text-white md:flex-row md:justify-between md:p-8 md:text-start">
          <div>
            <p className="text-lg font-extrabold">{t.ctaTitle}</p>
            <p className="mt-1 text-sm text-white/70">{t.ctaBody}</p>
          </div>
          <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" className="ks-btn ks-btn-whatsapp shrink-0">
            <WhatsAppIcon className="h-5 w-5" />
            {t.ctaBtn}
          </a>
        </aside>
      </article>

      {related.length ? (
        <section dir={dir} aria-labelledby="related-title" className="space-y-6">
          <h2 id="related-title" className="text-[22px] font-extrabold text-ink md:text-[28px]">
            {t.related}
          </h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {related.map((post) => (
              <li key={post.id}>
                <PostCard article={post} lang={lang} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "مقاله یافت نشد" };

  return {
    title: `${article.title} | کابل سفر`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.cover_image ? [article.cover_image] : undefined,
      type: "article",
    },
  };
}
