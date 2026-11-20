'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { FileText, ImageOff, Loader2, Plus, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  status: 'draft' | 'published'
  created_at: string
  updated_at?: string
  published_at?: string | null
  cover_image?: string
}

type StatusFilter = 'all' | 'published' | 'draft'

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

export default function AdminPostsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching articles:', error)
        setError('خطا در دریافت نوشته‌ها')
      } else {
        setArticles(data || [])
      }
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const deleteArticle = async (article: Article) => {
    if (!confirm(`«${article.title}» برای همیشه حذف شود؟`)) return
    const { error } = await supabase.from('articles').delete().eq('id', article.id)
    if (error) {
      console.error('Error deleting article:', error)
      alert('خطا در حذف نوشته')
    } else {
      setArticles((prev) => prev.filter((a) => a.id !== article.id))
    }
  }

  const counts = useMemo(
    () => ({
      all: articles.length,
      published: articles.filter((a) => a.status === 'published').length,
      draft: articles.filter((a) => a.status !== 'published').length,
    }),
    [articles],
  )

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).sort(),
    [articles],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (status === 'published' && a.status !== 'published') return false
      if (status === 'draft' && a.status === 'published') return false
      if (category && a.category !== category) return false
      if (q && !`${a.title} ${a.excerpt ?? ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [articles, status, category, query])

  const tabs: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: 'همه' },
    { id: 'published', label: 'منتشر شده' },
    { id: 'draft', label: 'پیش‌نویس' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">نوشته‌ها</h1>
          <p className="mt-1 text-sm text-muted">مقالات وبلاگ را مدیریت، ویرایش و منتشر کنید.</p>
        </div>
        <Link href="/admin/articles/new" className="ks-btn ks-btn-primary px-4 py-2.5 text-sm">
          <Plus className="h-4 w-4" />
          افزودن نوشته
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatus(tab.id)}
            className={`ks-card p-4 text-start transition-colors ${status === tab.id ? 'ring-2 ring-teal' : ''}`}
          >
            <span className="block text-xs font-semibold text-muted">{tab.label}</span>
            <span className="mt-1 block text-2xl font-extrabold text-ink">
              {counts[tab.id].toLocaleString('fa-IR')}
            </span>
          </button>
        ))}
      </div>

      <div className="ks-card overflow-hidden">
        {/* Toolbar: tabs + filters, like WP "subsubsub" */}
        <div className="flex flex-col gap-3 border-b border-line p-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-1 text-sm">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setStatus(tab.id)}
                  className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
                    status === tab.id ? 'bg-teal-soft text-teal' : 'text-muted hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {tab.label}{' '}
                  <span className="text-xs opacity-70">({counts[tab.id].toLocaleString('fa-IR')})</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-teal"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="relative">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی نوشته‌ها…"
                className="w-full rounded-xl border border-line bg-white py-2 pe-3 ps-9 text-sm outline-none focus:border-teal sm:w-60"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" /> در حال بارگذاری…
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-muted">
              <FileText className="h-6 w-6" />
            </span>
            <p className="text-sm text-muted">
              {articles.length === 0 ? 'هنوز نوشته‌ای ندارید.' : 'نوشته‌ای با این فیلتر پیدا نشد.'}
            </p>
            {articles.length === 0 ? (
              <Link href="/admin/articles/new" className="ks-btn ks-btn-primary px-4 py-2 text-sm">
                <Plus className="h-4 w-4" /> اولین نوشته را بنویسید
              </Link>
            ) : null}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="hidden bg-canvas/60 text-xs text-muted md:table-header-group">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">عنوان</th>
                <th className="px-4 py-3 text-start font-semibold">نویسنده</th>
                <th className="px-4 py-3 text-start font-semibold">دسته</th>
                <th className="px-4 py-3 text-start font-semibold">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {visible.map((article) => {
                const published = article.status === 'published'
                return (
                  <tr key={article.id} className="group align-top hover:bg-canvas/50">
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        {article.cover_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={article.cover_image}
                            alt=""
                            className="h-14 w-20 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-canvas text-muted">
                            <ImageOff className="h-4 w-4" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <Link
                            href={`/admin/articles/${article.id}`}
                            className="font-bold text-ink hover:text-teal"
                          >
                            {article.title || '(بدون عنوان)'}
                          </Link>
                          {!published ? (
                            <span className="ms-2 text-xs font-semibold text-amber">— پیش‌نویس</span>
                          ) : null}
                          {/* Row actions (WordPress style) */}
                          <div className="mt-1.5 flex flex-wrap gap-x-3 text-xs md:opacity-0 md:transition-opacity md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                            <Link href={`/admin/articles/${article.id}`} className="text-teal hover:underline">
                              ویرایش
                            </Link>
                            <a href={`/blog/${article.slug}`} target="_blank" rel="noreferrer" className="text-teal hover:underline">
                              {published ? 'نمایش' : 'پیش‌نمایش'}
                            </a>
                            <button type="button" onClick={() => deleteArticle(article)} className="text-red-600 hover:underline">
                              حذف
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-muted md:hidden">
                            {article.category || 'بدون دسته'} · {formatDate(article.published_at || article.created_at)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 text-muted md:table-cell">{article.author || '—'}</td>
                    <td className="hidden px-4 py-4 md:table-cell">
                      {article.category ? (
                        <button
                          type="button"
                          onClick={() => setCategory(article.category)}
                          className="text-teal hover:underline"
                        >
                          {article.category}
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="hidden px-4 py-4 text-xs md:table-cell">
                      <span className="block font-semibold text-ink">
                        {published ? 'منتشر شده' : 'آخرین ویرایش'}
                      </span>
                      <span className="text-muted">
                        {formatDate(published ? article.published_at || article.created_at : article.updated_at || article.created_at)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
