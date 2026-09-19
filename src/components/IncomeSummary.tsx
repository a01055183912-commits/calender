import type { ScheduleEvent } from '../types'
import { calcMonthlyIncome, countLectures, formatWon } from '../utils/income'
import { formatMonthTitle } from '../utils/date'

interface IncomeSummaryProps {
  current: Date
  events: ScheduleEvent[]
}

export default function IncomeSummary({ current, events }: IncomeSummaryProps) {
  const income = calcMonthlyIncome(events, current)
  const count = countLectures(events, current)

  return (
    <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-anniv-light to-work-light px-4 py-3 shadow-soft">
      <div>
        <p className="text-xs font-semibold text-tico-brown">{formatMonthTitle(current)} 예상 수입</p>
        <p className="text-xl font-extrabold text-tico-dark">{formatWon(income)}</p>
      </div>
      <div className="text-right text-xs text-tico-brown">
        <p>강의 {count}건</p>
        <p>🎤 강의단가 합산</p>
      </div>
    </div>
  )
}
