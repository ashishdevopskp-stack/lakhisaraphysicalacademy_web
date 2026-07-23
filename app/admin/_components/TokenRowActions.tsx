'use client'

import { useRef, useState, useTransition } from 'react'
import { Printer, Download, XCircle, Trash2, Loader2 } from 'lucide-react'
import { cancelToken, deleteToken } from '@/app/lib/action/tokens'
import { TokenCard, type TokenCardData } from './TokenCard'

export function TokenRowActions({
  id,
  status,
  card,
}: {
  id: string
  status: string
  card: TokenCardData
}) {
  const [pending, startTransition] = useTransition()
  const [busy, setBusy] = useState<'print' | 'download' | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  async function renderCanvas() {
    if (!cardRef.current) return null
    const html2canvas = (await import('html2canvas-pro')).default
    // The hidden capture wrapper below is pinned to a fixed 600px width,
    // so this is always sharp no matter what device/screen triggered it.
    return html2canvas(cardRef.current, { scale: 3, backgroundColor: '#fdf6ee' })
  }

  async function downloadImage() {
    setBusy('download')
    try {
      const canvas = await renderCanvas()
      if (!canvas) return
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `token-${card.serial}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } finally {
      setBusy(null)
    }
  }


  function handleCancel() {
    startTransition(async () => {
      await cancelToken(id)
    })
  }

  function handleDelete() {
    if (!window.confirm('Delete this token permanently? This cannot be undone.')) return
    startTransition(async () => {
      await deleteToken(id)
    })
  }

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        
        <button
          onClick={downloadImage}
          disabled={busy !== null}
          title="Download as image"
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-indigo-600 disabled:opacity-40"
        >
          {busy === 'download' ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        </button>
        {status === 'active' && (
          <button
            onClick={handleCancel}
            disabled={pending}
            title="Cancel token"
            className="p-1.5 rounded-md text-gray-500 hover:bg-amber-50 hover:text-amber-600 disabled:opacity-40"
          >
            <XCircle size={14} />
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={pending}
          title="Delete permanently"
          className="p-1.5 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* hidden card used as the source for print/download — fixed width
         so capture quality never depends on the viewer's screen size */}
      <div style={{ position: 'fixed', left: -9999, top: 0, width: 600 }}>
        <div ref={cardRef}>
          <TokenCard data={card} />
        </div>
      </div>
    </>
  )
}