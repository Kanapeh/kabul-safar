'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Eye,
  ImagePlus,
  Loader2,
  Music,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { uploadFile } from '@/lib/upload'
import { supabase } from '@/lib/supabase'

export type ArticleStatus = 'draft' | 'published'

export interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  content: string
  status: ArticleStatus
  cover_image: string
  published_at: string | null
}

export const emptyArticle: ArticleFormData = {
  title: '',
  slug: '',
  excerpt: '',
  category: '',
  author: '',
  content: '',
  status: 'draft',
  cover_image: '',
  published_at: null,
}

const AUDIO_TAG = /(?:<br>\s*)?<audio[^>]*>[\s\S]*?<\/audio>/g

export const extractAudio = (html: string) => {
  const match = html.match(/<audio[^>]*src="([^"]*)"[^>]*>/)
  return { audioUrl: match?.[1] ?? '', content: html.replace(AUDIO_TAG, '') }
}

export const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ‌\s-]/g, '')
    .replace(/[\s‌]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleString('fa-IR', { dateStyle: 'medium', timeStyle: 'short' })
    : 'فوری'

function Panel({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="ks-card overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-ink hover:bg-canvas/50"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? <div className="border-t border-line p-4">{children}</div> : null}
    </section>
  )
}

type Notice = { type: 'success' | 'error'; text: string; link?: string } | null

export function ArticleEditor({
  articleId,
  initialData = emptyArticle,
  initialAudioUrl = '',
}: {
  articleId?: string
  initialData?: ArticleFormData
  initialAudioUrl?: string
}) {
  const router = useRouter()
  const isNew = !articleId
  const [form, setForm] = useState<ArticleFormData>(initialData)
  const [audioUrl, setAudioUrl] = useState(initialAudioUrl)
  const [saving, setSaving] = useState<null | 'draft' | 'publish'>(null)
  const [uploading, setUploading] = useState<null | 'cover' | 'audio'>(null)
  const [dirty, setDirty] = useState(false)
  const [notice, setNotice] = useState<Notice>(() => {
    // Notice passed through the URL right after creating a new post
    if (isNew || typeof window === 'undefined') return null
    const saved = new URLSearchParams(window.location.search).get('saved')
    if (!saved) return null
    return {
      type: 'success',
      text: saved === 'published' ? 'نوشته منتشر شد.' : 'پیش‌نویس ذخیره شد.',
      link: saved === 'published' ? `/blog/${initialData.slug}` : undefined,
    }
  })
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [editingSlug, setEditingSlug] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const titleRef = useRef<HTMLTextAreaElement>(null)

  const update = useCallback(<K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
  }, [])

  // Existing categories, for the WordPress-style category box
  useEffect(() => {
    supabase
      .from('articles')
      .select('category')
      .then(({ data }) => {
        const list = Array.from(
          new Set((data ?? []).map((r: { category: string | null }) => r.category).filter(Boolean) as string[]),
        ).sort()
        setCategories(list)
      })
  }, [])

  // Auto-grow the title textarea
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [form.title])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const allCategories = useMemo(
    () => Array.from(new Set([...categories, form.category].filter(Boolean))).sort(),
    [categories, form.category],
  )

  const save = useCallback(
    async (publish: boolean) => {
      if (!form.title.trim()) {
        setNotice({ type: 'error', text: 'لطفاً عنوان نوشته را وارد کنید.' })
        titleRef.current?.focus()
        return
      }
      const plain = form.content.replace(/<[^>]*>/g, '').trim()
      if (!plain && !form.content.includes('<img')) {
        setNotice({ type: 'error', text: 'محتوای نوشته خالی است.' })
        return
      }

      setSaving(publish ? 'publish' : 'draft')
      setNotice(null)

      const slug = form.slug.trim() || generateSlug(form.title)
      const body = form.content.replace(AUDIO_TAG, '')
      const content = audioUrl ? `${body}<br><audio controls src="${audioUrl}"></audio>` : body
      const status: ArticleStatus = publish ? 'published' : 'draft'
      const published_at = publish ? form.published_at || new Date().toISOString() : null

      const payload = {
        title: form.title.trim(),
        slug,
        excerpt: form.excerpt,
        content,
        category: form.category,
        author: form.author,
        cover_image: form.cover_image,
        status,
        published_at,
      }

      try {
        if (isNew) {
          const { data, error } = await supabase.from('articles').insert(payload).select('id').single()
          if (error) throw error
          setDirty(false)
          router.replace(`/admin/articles/${data.id}?saved=${status}`)
          return
        }

        const { error } = await supabase
          .from('articles')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', articleId)
        if (error) throw error

        setForm((prev) => ({ ...prev, slug, status, published_at }))
        setDirty(false)
        setNotice({
          type: 'success',
          text: publish ? 'نوشته منتشر شد.' : 'پیش‌نویس ذخیره شد.',
          link: publish ? `/blog/${slug}` : undefined,
        })
      } catch (error) {
        console.error('Error saving article:', error)
        const code = (error as { code?: string })?.code
        setNotice({
          type: 'error',
          text:
            code === '23505'
              ? 'این نامک (Slug) قبلاً استفاده شده است. نامک دیگری انتخاب کنید.'
              : `خطا در ذخیره نوشته${error instanceof Error ? `: ${error.message}` : ''}`,
        })
      } finally {
        setSaving(null)
      }
    },
    [articleId, audioUrl, form, isNew, router],
  )

  // Ctrl/Cmd + S → save (keeps current status)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!saving) save(form.status === 'published')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [form.status, save, saving])

  // Clean the ?saved=… flag from the address bar
  useEffect(() => {
    if (!isNew && window.location.search.includes('saved=')) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [isNew])

  const handleTitle = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : generateSlug(value),
    }))
    setDirty(true)
  }

  const uploadCover = async (file: File) => {
    setUploading('cover')
    try {
      update('cover_image', await uploadFile(file, 'covers'))
    } catch (error) {
      console.error(error)
      setNotice({ type: 'error', text: 'خطا در آپلود تصویر شاخص.' })
    } finally {
      setUploading(null)
    }
  }

  const uploadAudio = async (file: File) => {
    setUploading('audio')
    try {
      setAudioUrl(await uploadFile(file, 'audio'))
      setDirty(true)
    } catch (error) {
      console.error(error)
      setNotice({ type: 'error', text: 'خطا در آپلود فایل صوتی.' })
    } finally {
      setUploading(null)
    }
  }

  const deleteArticle = async () => {
    if (!articleId || !confirm('این نوشته برای همیشه حذف شود؟')) return
    const { error } = await supabase.from('articles').delete().eq('id', articleId)
    if (error) {
      setNotice({ type: 'error', text: 'خطا در حذف نوشته.' })
      return
    }
    setDirty(false)
    router.push('/admin')
  }

  const addCategory = () => {
    const name = newCategory.trim()
    if (!name) return
    setCategories((prev) => Array.from(new Set([...prev, name])))
    update('category', name)
    setNewCategory('')
  }

  const isPublished = form.status === 'published'
  const primaryLabel = isPublished ? 'به‌روزرسانی' : 'انتشار'

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="sticky top-14 z-20 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas/90 px-4 py-3 backdrop-blur md:-mx-8 md:px-8 lg:top-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink hover:bg-canvas"
            aria-label="بازگشت به نوشته‌ها"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-base font-extrabold text-ink">{isNew ? 'افزودن نوشته' : 'ویرایش نوشته'}</h1>
            <p className="text-xs text-muted">
              {dirty ? 'تغییرات ذخیره نشده' : isNew ? 'هنوز ذخیره نشده' : 'همه تغییرات ذخیره شده'}
              <span className="hidden sm:inline"> · ذخیره سریع: Ctrl+S</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isPublished ? (
            <button
              type="button"
              onClick={() => save(false)}
              disabled={!!saving}
              className="ks-btn ks-btn-ghost px-4 py-2 text-sm disabled:opacity-60"
            >
              {saving === 'draft' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              ذخیره پیش‌نویس
            </button>
          ) : null}
          {!isNew ? (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="ks-btn ks-btn-ghost px-3 py-2 text-sm"
              title="نمایش در سایت"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">{isPublished ? 'نمایش' : 'پیش‌نمایش'}</span>
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => save(true)}
            disabled={!!saving}
            className="ks-btn px-5 py-2 text-sm text-white disabled:opacity-60"
            style={{ background: 'var(--ks-teal)' }}
          >
            {saving === 'publish' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {primaryLabel}
          </button>
        </div>
      </div>

      {notice ? (
        <div
          role={notice.type === 'error' ? 'alert' : 'status'}
          className={`flex items-center justify-between gap-3 rounded-xl border-s-4 bg-white px-4 py-3 text-sm shadow-sm ${
            notice.type === 'success' ? 'border-s-emerald-500' : 'border-s-red-500'
          }`}
        >
          <span className="flex items-center gap-2 font-medium text-ink">
            {notice.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : null}
            {notice.text}
            {notice.link ? (
              <a href={notice.link} target="_blank" rel="noreferrer" className="text-teal underline">
                نمایش نوشته
              </a>
            ) : null}
          </span>
          <button type="button" onClick={() => setNotice(null)} aria-label="بستن" className="text-muted hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main column */}
        <div className="min-w-0 space-y-4">
          <div>
            <textarea
              ref={titleRef}
              rows={1}
              value={form.title}
              onChange={(e) => handleTitle(e.target.value)}
              placeholder="عنوان را اینجا وارد کنید"
              aria-label="عنوان نوشته"
              className="block w-full resize-none overflow-hidden rounded-2xl border border-line bg-white px-5 py-4 text-2xl font-black leading-[1.6] text-ink outline-none placeholder:text-muted/50 focus:border-teal md:text-3xl"
            />
            {/* Permalink (slug) */}
            <div className="mt-2 flex flex-wrap items-center gap-2 px-1 text-xs text-muted">
              <span className="font-semibold">پیوند یکتا:</span>
              {editingSlug ? (
                <>
                  <span dir="ltr">/blog/</span>
                  <input
                    autoFocus
                    dir="ltr"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      update('slug', e.target.value)
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingSlug(false)}
                    className="h-7 min-w-48 rounded-md border border-line bg-white px-2 text-xs text-ink outline-none focus:border-teal"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      update('slug', generateSlug(form.slug))
                      setEditingSlug(false)
                    }}
                    className="rounded-md bg-navy px-2.5 py-1 font-semibold text-white"
                  >
                    تایید
                  </button>
                </>
              ) : (
                <>
                  <span dir="ltr" className="truncate text-teal">
                    /blog/{form.slug || generateSlug(form.title) || '…'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSlug(true)}
                    className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-0.5 font-semibold text-ink hover:bg-canvas"
                  >
                    <Pencil className="h-3 w-3" /> ویرایش
                  </button>
                </>
              )}
            </div>
          </div>

          <RichTextEditor
            content={form.content}
            onChange={(content) => update('content', content)}
            onImageUpload={(file) => uploadFile(file, 'images')}
          />

          <Panel title="چکیده (نمایش در فهرست وبلاگ)">
            <textarea
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="خلاصه‌ای کوتاه از نوشته که در کارت‌های وبلاگ و نتایج جستجو نمایش داده می‌شود."
              className="w-full resize-y rounded-xl border border-line px-3 py-2.5 text-sm leading-7 outline-none focus:border-teal"
            />
            <p className="mt-1 text-end text-[11px] text-muted">
              {form.excerpt.length.toLocaleString('fa-IR')} / ۳۰۰
            </p>
          </Panel>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Panel title="انتشار">
            <dl className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted">وضعیت:</dt>
                <dd>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-soft text-amber'
                    }`}
                  >
                    {isPublished ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-muted">
                  <CalendarDays className="h-4 w-4" /> انتشار:
                </dt>
                <dd className="font-semibold text-ink">{formatDate(form.published_at)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-4">
              {!isNew ? (
                <button
                  type="button"
                  onClick={deleteArticle}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> حذف نوشته
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                {isPublished ? (
                  <button
                    type="button"
                    onClick={() => save(false)}
                    disabled={!!saving}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas disabled:opacity-60"
                  >
                    بازگشت به پیش‌نویس
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => save(true)}
                  disabled={!!saving}
                  className="rounded-lg px-4 py-1.5 text-xs font-bold text-white disabled:opacity-60"
                  style={{ background: 'var(--ks-teal)' }}
                >
                  {primaryLabel}
                </button>
              </div>
            </div>
          </Panel>

          <Panel title="دسته‌ها">
            <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-line p-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-canvas">
                <input
                  type="radio"
                  name="category"
                  checked={!form.category}
                  onChange={() => update('category', '')}
                  className="accent-[var(--ks-teal)]"
                />
                <span className="text-muted">بدون دسته</span>
              </label>
              {allCategories.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-canvas">
                  <input
                    type="radio"
                    name="category"
                    checked={form.category === c}
                    onChange={() => update('category', c)}
                    className="accent-[var(--ks-teal)]"
                  />
                  {c}
                </label>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addCategory()
                  }
                }}
                placeholder="افزودن دسته تازه"
                className="h-9 min-w-0 flex-1 rounded-lg border border-line px-3 text-sm outline-none focus:border-teal"
              />
              <button
                type="button"
                onClick={addCategory}
                className="h-9 rounded-lg border border-line px-3 text-sm font-semibold text-ink hover:bg-canvas"
              >
                افزودن
              </button>
            </div>
          </Panel>

          <Panel title="تصویر شاخص">
            {form.cover_image ? (
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.cover_image} alt="" className="aspect-video w-full rounded-xl object-cover" />
                <div className="flex justify-between text-xs font-semibold">
                  <label className="cursor-pointer text-teal hover:underline">
                    جایگزینی تصویر
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        e.target.value = ''
                        if (f) uploadCover(f)
                      }}
                    />
                  </label>
                  <button type="button" onClick={() => update('cover_image', '')} className="text-red-600 hover:underline">
                    حذف تصویر شاخص
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-canvas/50 text-sm font-semibold text-muted transition-colors hover:border-teal hover:text-teal">
                {uploading === 'cover' ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
                {uploading === 'cover' ? 'در حال آپلود…' : 'تنظیم تصویر شاخص'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading === 'cover'}
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    e.target.value = ''
                    if (f) uploadCover(f)
                  }}
                />
              </label>
            )}
          </Panel>

          <Panel title="نویسنده">
            <input
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              placeholder="نام نویسنده"
              className="h-10 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-teal"
            />
          </Panel>

          <Panel title="فایل صوتی (اختیاری)" defaultOpen={!!audioUrl}>
            {audioUrl ? (
              <div className="space-y-2">
                <audio controls src={audioUrl} className="w-full" />
                <button
                  type="button"
                  onClick={() => {
                    setAudioUrl('')
                    setDirty(true)
                  }}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  حذف فایل صوتی
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-canvas/50 py-4 text-sm font-semibold text-muted hover:border-teal hover:text-teal">
                {uploading === 'audio' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Music className="h-4 w-4" />}
                {uploading === 'audio' ? 'در حال آپلود…' : 'انتخاب فایل صوتی'}
                <input
                  type="file"
                  accept="audio/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    e.target.value = ''
                    if (f) uploadAudio(f)
                  }}
                />
              </label>
            )}
          </Panel>
        </aside>
      </div>
    </div>
  )
}
