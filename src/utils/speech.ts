import { format, addDays } from 'date-fns'

export function isSpeechSupported(): boolean {
  const w = window as any
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition)
}

export function createRecognizer(): any | null {
  const w = window as any
  const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition
  if (!SpeechRecognition) return null
  const recognition = new SpeechRecognition()
  recognition.lang = 'ko-KR'
  recognition.continuous = false
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  return recognition
}

export interface ParsedVoiceEvent {
  date: string // yyyy-MM-dd
  time: string // HH:mm or ''
  title: string
}

const NUM_KOR: Record<string, number> = {
  하나: 1, 한: 1, 둘: 2, 두: 2, 셋: 3, 세: 3, 넷: 4, 네: 4, 다섯: 5,
  여섯: 6, 일곱: 7, 여덟: 8, 아홉: 9, 열: 10,
}

function parseTime(text: string): string {
  let hour: number | null = null
  let minute = 0
  const isPM = /오후/.test(text)
  const isAM = /오전/.test(text)

  const hourMatch = text.match(/(\d{1,2})\s*시/)
  if (hourMatch) {
    hour = parseInt(hourMatch[1], 10)
  } else {
    for (const [kor, num] of Object.entries(NUM_KOR)) {
      if (text.includes(kor + '시')) {
        hour = num
        break
      }
    }
  }
  if (hour === null) return ''

  const minMatch = text.match(/(\d{1,2})\s*분/)
  if (minMatch) minute = parseInt(minMatch[1], 10)
  if (text.includes('반') && !minMatch) minute = 30

  if (isPM && hour < 12) hour += 12
  if (isAM && hour === 12) hour = 0

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function parseDate(text: string, base: Date): string {
  const today = new Date(base)
  today.setHours(0, 0, 0, 0)

  if (text.includes('오늘')) return format(today, 'yyyy-MM-dd')
  if (text.includes('모레') || text.includes('내일모레')) return format(addDays(today, 2), 'yyyy-MM-dd')
  if (text.includes('내일')) return format(addDays(today, 1), 'yyyy-MM-dd')

  const mdMatch = text.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/)
  if (mdMatch) {
    const month = parseInt(mdMatch[1], 10)
    const day = parseInt(mdMatch[2], 10)
    let year = today.getFullYear()
    const candidate = new Date(year, month - 1, day)
    if (candidate.getTime() < today.getTime() - 1000 * 60 * 60 * 24 * 60) {
      year += 1
    }
    return format(new Date(year, month - 1, day), 'yyyy-MM-dd')
  }

  const dayOnlyMatch = text.match(/^(\d{1,2})\s*일/)
  if (dayOnlyMatch) {
    const day = parseInt(dayOnlyMatch[1], 10)
    return format(new Date(today.getFullYear(), today.getMonth(), day), 'yyyy-MM-dd')
  }

  return format(today, 'yyyy-MM-dd')
}

export function parseVoiceText(raw: string, base: Date = new Date()): ParsedVoiceEvent {
  const text = raw.trim()
  const date = parseDate(text, base)
  const time = parseTime(text)

  let title = text
    .replace(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/g, '')
    .replace(/오늘|내일모레|모레|내일/g, '')
    .replace(/오전|오후/g, '')
    .replace(/(\d{1,2})\s*시\s*(\d{1,2})?\s*분?/g, '')
    .replace(/에\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!title) title = text

  return { date, time, title }
}
