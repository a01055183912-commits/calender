import type { ScheduleEvent } from '../types'
import { toKey } from '../utils/date'
import { getHoliday } from '../utils/holidays'
import { CATEGORY_DOT } from './CategoryTag'
import PawPrint from './PawPrint'

interface DayCellProps {
  date: Date
  inMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: ScheduleEvent[]
  onClick: () => void
}

export default function DayCell({ date, inMonth, isToday, isSelected, events, onClick }: DayCellProps) {
  const dayNum = date.getDate()
  const weekday = date.getDay()
  const holiday = getHoliday(toKey(date))
  const isRed = weekday === 0 || weekday === 6 || !!holiday
  const hasLecture = events.some((e) => e.isLecture)
  const visibleDots = events.slice(0, 3)

  return (
    <button
      onClick={onClick}
      className={`relative flex h-20 flex-col items-center rounded-xl py-1.5 transition sm:h-24 ${
        isSelected ? 'bg-anniv-light ring-2 ring-anniv' : 'active:bg-cream'
      } ${!inMonth ? 'opacity-35' : ''}`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold ${
          isToday ? 'bg-work text-white' : isRed ? 'text-holiday' : 'text-tico-dark'
        }`}
      >
        {dayNum}
      </span>

      {holiday && inMonth && (
        <span className="mt-0.5 max-w-full truncate px-0.5 text-[9px] font-bold leading-none text-holiday">
          {holiday}
        </span>
      )}

      {events.length === 0 && inMonth && !holiday && (
        <PawPrint size={11} className="mt-2 text-tico-brown/25" />
      )}

      {events.length > 0 && (
        <div className="mt-1 flex flex-col items-center gap-0.5">
          <div className="flex gap-0.5">
            {visibleDots.map((e) => (
              <span key={e.id} className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[e.category]}`} />
            ))}
          </div>
          {hasLecture && <span className="text-[10px] leading-none">🎤</span>}
          {events.length > 3 && <span className="text-[9px] text-tico-brown">+{events.length - 3}</span>}
        </div>
      )}
    </button>
  )
}
