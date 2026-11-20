'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import {
  ArticleEditor,
  extractAudio,
  type ArticleFormData,
} from '@/components/admin/article-editor'

export default function EditArticlePage() {
  const params = useParams<{ id: string }>()
  const [data, setData] = useState<{ form: ArticleFormData; audioUrl: string } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: row, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !row) {
        console.error('Error fetching article:', error)
        setError(true)
        return
      }

      const { audioUrl, content } = extractAudio(row.content || '')
      setData({
        audioUrl,
        form: {
          title: row.title || '',
          slug: row.slug || '',
          excerpt: row.excerpt || '',
          category: row.category || '',
          author: row.author || '',
          content,
          status: row.status === 'published' ? 'published' : 'draft',
          cover_image: row.cover_image || '',
          published_at: row.published_at,
        },
      })
    }
    load()
  }, [params.id])

  if (error) {
    return (
      <div className="ks-card mx-auto max-w-md p-8 text-center">
        <p className="font-semibold text-ink">نوشته پیدا نشد.</p>
        <Link href="/admin" className="mt-4 inline-block text-sm text-teal hover:underline">
          بازگشت به نوشته‌ها
        </Link>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" /> در حال بارگذاری نوشته…
      </div>
    )
  }

  return <ArticleEditor key={params.id} articleId={params.id} initialData={data.form} initialAudioUrl={data.audioUrl} />
}
