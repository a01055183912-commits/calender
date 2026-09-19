import type { ScheduleEvent } from '../types'
import { format } from 'date-fns'

export function monthKey(date: Date): string {
  return format(date, 'yyyy-MM')
}

export function calcMonthlyIncome(events: ScheduleEvent[], current: Date): number {
  const key = monthKey(current)
  return events
    .filter((e) => e.isLecture && e.lecture && e.date.startsWith(key))
    .reduce((sum, e) => sum + (Number(e.lecture?.fee) || 0), 0)
}

export function countLectures(events: ScheduleEvent[], current: Date): number {
  const key = monthKey(current)
  return events.filter((e) => e.isLecture && e.date.startsWith(key)).length
}

export function formatWon(n: number): string {
  return n.toLocaleString('ko-KR') + '원'
}
