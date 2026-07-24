// app/components/ChatWidget.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Loader2, RotateCcw, AlertTriangle, Square } from 'lucide-react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm the Lakhisarai Physical Academy assistant. Ask me about our training programs, admissions, hostel, fees process, or timings.",
}

const REQUEST_TIMEOUT_MS = 20000

export default function ChatWidget({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFailedText, setLastFailedText] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, loading])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 96) + 'px'
  }

  async function sendMessage(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return

    const nextMessages: ChatMessage[] = overrideText
      ? messages // retry: message already in history
      : [...messages, { role: 'user', content: text }]

    if (!overrideText) setMessages(nextMessages)
    setInput('')
    setError(null)
    setLastFailedText(null)
    setLoading(true)
    requestAnimationFrame(autoResize)

    const controller = new AbortController()
    abortControllerRef.current = controller
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
        signal: controller.signal,
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // response wasn't valid JSON
      }

      if (!res.ok) {
        setError(
          data?.error ??
            (res.status >= 500
              ? 'Our assistant is having trouble right now. Please try again in a moment.'
              : 'Something went wrong. Please try again.')
        )
        setLastFailedText(text)
        return
      }

      if (!data?.reply) {
        setError('Received an empty response. Please try again.')
        setLastFailedText(text)
        return
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        if (controller.signal.reason === 'user-cancelled') {
          setError(null)
        } else {
          setError('That took too long to respond. Please try again.')
          setLastFailedText(text)
        }
      } else {
        setError('Network error. Please check your connection and try again.')
        setLastFailedText(text)
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  function handleStop() {
    abortControllerRef.current?.abort('user-cancelled')
  }

  function handleRetry() {
    if (lastFailedText) sendMessage(lastFailedText)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
    if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end sm:bottom-5">
      {open && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm h-[30rem] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Academy Assistant</p>
                <p className="text-[11px] text-indigo-100 leading-tight">
                  Courses, admission &amp; more
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-md hover:bg-white/15 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={
                    'max-w-[85%] text-sm px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap break-words leading-relaxed ' +
                    (m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm')
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-gray-400 flex items-center gap-1.5 shadow-sm">
                  <Loader2 size={14} className="animate-spin" /> Typing...
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="max-w-[90%] flex flex-col gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                  {lastFailedText && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      disabled={loading}
                      className="self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-red-300 text-red-700 font-medium hover:bg-red-100 disabled:opacity-50 transition-colors"
                    >
                      <RotateCcw size={12} /> Retry
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-2.5 flex items-end gap-2 bg-white shrink-0">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                autoResize()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about admission, courses, hostel..."
              rows={1}
              maxLength={500}
              className="flex-1 resize-none text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-24"
            />
            {loading ? (
              <button
                type="button"
                onClick={handleStop}
                aria-label="Stop generating"
                title="Stop"
                className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors shrink-0"
              >
                <Square size={16} fill="currentColor" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="p-2.5 rounded-lg bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors shrink-0"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}