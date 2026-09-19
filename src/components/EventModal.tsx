import { useEffect, useState } from 'react'
import type { Category, LectureInfo, ScheduleEvent } from '../types'
import { CATEGORY_LABEL } from '../types'
import { toKey } from '../utils/date'
import VoiceButton from './VoiceButton'
import { parseVoiceText } from '../utils/speech'
import { lectureTypeColor } from '../utils/lectureColor'

interface EventModalProps {
  date: Date
  editing: ScheduleEvent | null
  lectureTypes: string[]
  onAddLectureType: (type: string) => void
  onSave: (data: Omit<ScheduleEvent, 'id' | 'createdAt'>) => void
  onDelete?: (id: string) => void
  onClose: () => void
}

const CATEGORIES: Category[] = ['anniv', 'work', 'personal']

const emptyLecture: LectureInfo = { orgName: '', contactPhone: '', fee: '', lectureType: '기관' }

export default function EventModal({
  date,
  editing,
  lectureTypes,
  onAddLectureType,
  onSave,
  onDelete,
  onClose,
}: EventModalProps) {
  const [title, setTitle] = useState(editing?.title ?? '')
  const [dateValue, setDateValue] = useState(editing?.date ?? toKey(date))
  const [time, setTime] = useState(editing?.time ?? '')
  const [category, setCategory] = useState<Category>(editing?.category ?? 'work')
  const [memo, setMemo] = useState(editing?.memo ?? '')
  const [isLecture, setIsLecture] = useState(editing?.isLecture ?? false)
  const [lecture, setLecture] = useState<LectureInfo>(editing?.lecture ?? emptyLecture)
  const [newTypeInput, setNewTypeInput] = useState('')
  const [showNewType, setShowNewType] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleVoiceResult = (text: string) => {
    const parsed = parseVoiceText(text, new Date(dateValue))
    setTitle(parsed.title)
    setDateValue(parsed.date)
    if (parsed.time) setTime(parsed.time)
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('일정 제목을 입력해주세요')
      return
    }
    onSave({
      date: dateValue,
      time,
      title: title.trim(),
      memo: memo.trim(),
      category,
      isLecture,
      lecture: isLecture ? lecture : null,
    })
  }

  const addNewType = () => {
    const t = newTypeInput.trim()
    if (!t) return
    onAddLectureType(t)
    setLecture((prev) => ({ ...prev, lectureType: t }))
    setNewTypeInput('')
    setShowNewType(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-4 shadow-bubble sm:rounded-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-tico-dark">
            {editing ? '일정 수정' : '새 일정 등록'}
          </h2>
          <button onClick={onClose} className="text-2xl leading-none text-tico-brown" aria-label="닫기">
            ×
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          <VoiceButton onResult={handleVoiceResult} label="말로 일정 입력하기" />
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-tico-brown">일정 제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: OO기관 강의"
              className="w-full rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-tico-brown">날짜</label>
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-tico-brown">시간 (선택)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-tico-brown">카테고리</label>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${
                    category === c
                      ? c === 'anniv'
                        ? 'bg-anniv-DEFAULT text-white'
                        : c === 'work'
                        ? 'bg-work-DEFAULT text-white'
                        : 'bg-personal-DEFAULT text-white'
                      : 'bg-cream text-tico-brown'
                  }`}
                >
                  {CATEGORY_LABEL[c]}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 rounded-xl bg-work-light/60 px-3 py-2.5">
            <input
              type="checkbox"
              checked={isLecture}
              onChange={(e) => setIsLecture(e.target.checked)}
              className="h-5 w-5 accent-work-DEFAULT"
            />
            <span className="text-sm font-bold text-work-dark">🎤 강의 일정으로 등록 (담당기관·단가 입력)</span>
          </label>

          {isLecture && (
            <div className="space-y-2 rounded-xl border border-work-light bg-work-light/30 p-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-tico-brown">담당 기관명</label>
                <input
                  value={lecture.orgName}
                  onChange={(e) => setLecture((p) => ({ ...p, orgName: e.target.value }))}
                  placeholder="예: OO초등학교"
                  className="w-full rounded-xl border border-cream bg-white px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-tico-brown">담당자 전화번호</label>
                <input
                  type="tel"
                  value={lecture.contactPhone}
                  onChange={(e) => setLecture((p) => ({ ...p, contactPhone: e.target.value }))}
                  placeholder="010-1234-5678"
                  className="w-full rounded-xl border border-cream bg-white px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-tico-brown">강의단가 (원)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={lecture.fee}
                  onChange={(e) =>
                    setLecture((p) => ({ ...p, fee: e.target.value === '' ? '' : Number(e.target.value) }))
                  }
                  placeholder="예: 300000"
                  className="w-full rounded-xl border border-cream bg-white px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-tico-brown">강의분류</label>
                <div className="flex flex-wrap gap-1.5">
                  {lectureTypes.map((t) => {
                    const c = lectureTypeColor(t)
                    const selected = lecture.lectureType === t
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setLecture((p) => ({ ...p, lectureType: t }))}
                        style={{
                          backgroundColor: c.bg,
                          color: c.text,
                          boxShadow: selected ? `0 0 0 2px ${c.text}` : 'none',
                        }}
                        className="rounded-full px-3 py-1.5 text-xs font-bold transition"
                      >
                        {t}
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => setShowNewType((v) => !v)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-tico-brown"
                  >
                    + 추가
                  </button>
                </div>
                {showNewType && (
                  <div className="mt-2 flex gap-1.5">
                    <input
                      value={newTypeInput}
                      onChange={(e) => setNewTypeInput(e.target.value)}
                      placeholder="새 분류 이름"
                      className="flex-1 rounded-xl border border-cream bg-white px-3 py-2 text-sm outline-none focus:border-work-DEFAULT"
                    />
                    <button
                      type="button"
                      onClick={addNewType}
                      className="rounded-xl bg-work-DEFAULT px-3 py-2 text-sm font-bold text-white"
                    >
                      추가
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-bold text-tico-brown">메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={2}
              placeholder="추가로 기록할 내용"
              className="w-full resize-none rounded-xl border border-cream bg-cream/60 px-3 py-2.5 text-base outline-none focus:border-work-DEFAULT"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2 pb-2">
          {editing && onDelete && (
            <button
              onClick={() => onDelete(editing.id)}
              className="rounded-xl bg-anniv-light px-4 py-3 text-sm font-bold text-anniv-dark"
            >
              삭제
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-work-DEFAULT py-3 text-base font-bold text-white shadow-soft"
          >
            {editing ? '수정 완료' : '일정 등록'}
          </button>
        </div>
      </div>
    </div>
  )
}
