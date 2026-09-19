import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'

export const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export function toKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function getMonthGrid(current: Date): Date[] {
  const start = startOfWeek(startOfMonth(current), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(current), { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end })
}

export function isCurrentMonth(date: Date, current: Date): boolean {
  return isSameMonth(date, current)
}

export { addMonths, subMonths, isSameDay, isToday, format }

export function daysUntil(dateKey: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateKey + 'T00:00:00')
  const diffMs = target.getTime() - today.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

export function formatMonthTitle(date: Date): string {
  return format(date, 'yyyy년 M월')
}

export function formatDayTitle(date: Date): string {
  return format(date, 'M월 d일') + ' (' + WEEKDAY_LABELS[date.getDay()] + ')'
}
