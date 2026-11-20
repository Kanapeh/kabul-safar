"use client";

import { BookOpen } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { ArchVisual } from "@/components/arch-visual";
import { BlogIndex } from "@/components/blog/blog-index";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";
import { CtaPromo } from "@/sections/cta-promo";

export default function BlogPage() {
  const { lang } = useI18n();
  const content = getBlogContent(lang);
  const eyebrow = lang === "en" ? "Travel notes" : lang === "ps" ? "د سفر لارښوونې" : "یادداشت‌های سفر";

  return (
    <PageShell>
      <PageHero
        eyebrow={eyebrow}
        eyebrowIcon={<BookOpen className="h-3.5 w-3.5" aria-hidden="true" />}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        aside={<ArchVisual src="/images/destination.jpg" badge={eyebrow} />}
      />
      <BlogIndex />
      <CtaPromo />
    </PageShell>
  );
}
