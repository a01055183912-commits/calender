import { useState } from 'react'

interface TodoModalProps {
  defaultDate: string | null
  onSave: (text: string, date: string | null) => void
  onClose: () => void
}

export default function TodoModal({ defaultDate, onSave, onClose }: TodoModalProps) {
  const [text, setText] = useState('')
  const [linkDate, setLinkDate] = useState<string | null>(defaultDate)

  const handleSubmit = () => {
    if (!text.trim()) return
    onSave(text.trim(), linkDate)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-white p-4 shadow-bubble sm:rounded-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-tico-dark">할 일 추가</h2>
          <button onClick={onClose} className="text-2xl leading-none text-tico-brown">
            ×
          </button>
        </div>
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="mb-3 w-full rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-personal"
        />
        <label className="mb-1 block text-xs font-bold text-tico-brown">연결할 날짜 (선택)</label>
        <input
          type="date"
          value={linkDate ?? ''}
          onChange={(e) => setLinkDate(e.target.value || null)}
          className="mb-4 w-full rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-personal"
        />
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-personal py-3 text-base font-bold text-white shadow-soft"
        >
          추가하기
        </button>
      </div>
    </div>
  )
}
