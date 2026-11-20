'use client'

import { useEffect, useRef, useState } from 'react'
import { useEditor, useEditorState, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  Loader2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  Unlink,
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

type Mode = 'visual' | 'html'

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-35 ${
        active ? 'bg-navy text-white' : 'text-ink hover:bg-canvas'
      }`}
    >
      {children}
    </button>
  )
}

const Divider = () => <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor
  onPickImage: () => void
  uploading: boolean
}) {
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      block: e.isActive('heading', { level: 2 })
        ? 'h2'
        : e.isActive('heading', { level: 3 })
          ? 'h3'
          : e.isActive('heading', { level: 4 })
            ? 'h4'
            : 'p',
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      link: e.isActive('link'),
      alignRight: e.isActive({ textAlign: 'right' }),
      alignCenter: e.isActive({ textAlign: 'center' }),
      alignLeft: e.isActive({ textAlign: 'left' }),
      alignJustify: e.isActive({ textAlign: 'justify' }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  })

  const setBlock = (value: string) => {
    const chain = editor.chain().focus()
    if (value === 'p') chain.setParagraph().run()
    else chain.setHeading({ level: Number(value.slice(1)) as 2 | 3 | 4 }).run()
  }

  const openLink = () => {
    setLinkUrl(editor.getAttributes('link').href ?? '')
    setLinkOpen((v) => !v)
  }

  const applyLink = () => {
    const url = linkUrl.trim()
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      const href = /^(https?:|mailto:|tel:|\/|#)/.test(url) ? url : `https://${url}`
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    }
    setLinkOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-0.5 p-1.5">
        <select
          value={state.block}
          onChange={(e) => setBlock(e.target.value)}
          aria-label="نوع بلوک"
          className="h-8 rounded-lg border border-line bg-white px-2 text-sm font-semibold text-ink outline-none focus:border-teal"
        >
          <option value="p">پاراگراف</option>
          <option value="h2">تیتر ۲</option>
          <option value="h3">تیتر ۳</option>
          <option value="h4">تیتر ۴</option>
        </select>
        <Divider />
        <ToolbarButton title="پررنگ (Ctrl+B)" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="ایتالیک (Ctrl+I)" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="زیرخط (Ctrl+U)" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="خط‌خورده" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="فهرست نقطه‌ای" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="فهرست شماره‌دار" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="نقل‌قول" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="راست‌چین" active={state.alignRight} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="وسط‌چین" active={state.alignCenter} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="چپ‌چین" active={state.alignLeft} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="تراز دوطرفه" active={state.alignJustify} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="افزودن پیوند (Ctrl+K)" active={state.link || linkOpen} onClick={openLink}>
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        {state.link ? (
          <ToolbarButton title="حذف پیوند" onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}>
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
        ) : null}
        <ToolbarButton title="افزودن تصویر" disabled={uploading} onClick={onPickImage}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        </ToolbarButton>
        <ToolbarButton title="خط جداکننده" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton title="بازگردانی (Ctrl+Z)" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="انجام دوباره" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {linkOpen ? (
        <div className="flex items-center gap-2 border-t border-line bg-canvas/60 p-2">
          <input
            autoFocus
            type="url"
            dir="ltr"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
              if (e.key === 'Escape') setLinkOpen(false)
            }}
            placeholder="https://"
            className="h-9 flex-1 rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-teal"
          />
          <button type="button" onClick={applyLink} className="h-9 rounded-lg bg-navy px-4 text-sm font-semibold text-white">
            اعمال
          </button>
          <button type="button" onClick={() => setLinkOpen(false)} className="h-9 rounded-lg px-3 text-sm text-muted hover:bg-white">
            انصراف
          </button>
        </div>
      ) : null}
    </div>
  )
}

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0)

export default function RichTextEditor({ content, onChange, onImageUpload }: RichTextEditorProps) {
  const [mode, setMode] = useState<Mode>('visual')
  const [html, setHtml] = useState(content)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: 'noopener noreferrer' },
        },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'], defaultAlignment: 'right' }),
      Placeholder.configure({ placeholder: 'متن نوشته را اینجا بنویسید… برای تیتر از منوی «پاراگراف» استفاده کنید.' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'article-content min-h-[420px] px-5 py-5 outline-none md:px-8 md:py-7',
        dir: 'rtl',
      },
      handleKeyDown: (_view, event) => {
        // Ctrl/Cmd + K opens the link input via the toolbar button
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault()
          document.querySelector<HTMLButtonElement>('[aria-label="افزودن پیوند (Ctrl+K)"]')?.click()
          return true
        }
        return false
      },
    },
  })

  const words = useEditorState({
    editor,
    selector: ({ editor: e }) => countWords(e?.getText() ?? ''),
  }) ?? 0

  // Keep the editor in sync if the parent replaces the content (e.g. after loading)
  useEffect(() => {
    if (editor && content !== editor.getHTML() && mode === 'visual' && !editor.isFocused) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor, mode])

  const switchMode = (next: Mode) => {
    if (!editor || next === mode) return
    if (next === 'html') {
      setHtml(editor.getHTML())
    } else {
      editor.commands.setContent(html, { emitUpdate: false })
      onChange(editor.getHTML())
    }
    setMode(next)
  }

  const pickImage = () => {
    if (!onImageUpload) {
      const url = window.prompt('نشانی تصویر را وارد کنید:')
      if (url) editor?.chain().focus().setImage({ src: url }).run()
      return
    }
    fileInputRef.current?.click()
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !onImageUpload) return
    setUploading(true)
    try {
      const url = await onImageUpload(file)
      const alt = window.prompt('متن جایگزین تصویر (برای سئو و دسترس‌پذیری):', '') ?? ''
      editor?.chain().focus().setImage({ src: url, alt }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('خطا در آپلود تصویر')
    } finally {
      setUploading(false)
    }
  }

  if (!editor) {
    return <div className="min-h-[480px] animate-pulse rounded-2xl bg-white" />
  }

  return (
    <div className="rounded-2xl border border-line bg-white">
      {/* Visual / HTML tabs — like the WordPress classic editor */}
      <div className="flex items-center justify-between rounded-t-2xl border-b border-line bg-canvas/60 px-2 pt-2">
        <span className="px-2 pb-2 text-xs font-semibold text-muted">محتوای نوشته</span>
        <div className="flex gap-1">
          {(['visual', 'html'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`rounded-t-lg border border-b-0 px-3 py-1.5 text-xs font-semibold ${
                mode === m ? 'border-line bg-white text-ink' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {m === 'visual' ? 'دیداری' : 'کد HTML'}
            </button>
          ))}
        </div>
      </div>

      {mode === 'visual' ? (
        <>
          <div className="z-10 border-b border-line bg-white/95 backdrop-blur lg:sticky lg:top-[68px]">
            <Toolbar editor={editor} onPickImage={pickImage} uploading={uploading} />
          </div>
          <EditorContent editor={editor} />
        </>
      ) : (
        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value)
            onChange(e.target.value)
          }}
          dir="ltr"
          spellCheck={false}
          className="block min-h-[480px] w-full resize-y p-5 font-mono text-[13px] leading-6 text-ink outline-none"
        />
      )}

      <div className="flex items-center justify-between rounded-b-2xl border-t border-line bg-canvas/60 px-4 py-2 text-xs text-muted">
        <span>تعداد کلمات: {words.toLocaleString('fa-IR')}</span>
        <span>زمان مطالعه: حدود {Math.max(1, Math.round(words / 200)).toLocaleString('fa-IR')} دقیقه</span>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </div>
  )
}
