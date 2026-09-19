import type { ScheduleEvent } from '../types'
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
  const hasLecture = events.some((e) => e.isLecture)
  const visibleDots = events.slice(0, 3)

  return (
    <button
      onClick={onClick}
      className={`relative flex h-16 flex-col items-center rounded-xl py-1 transition sm:h-20 ${
        isSelected ? 'bg-anniv-light ring-2 ring-anniv-DEFAULT' : 'active:bg-cream'
      } ${!inMonth ? 'opacity-35' : ''}`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
          isToday ? 'bg-work-DEFAULT font-bold text-white' : ''
        } ${!isToday && weekday === 0 ? 'text-anniv-dark' : ''} ${
          !isToday && weekday === 6 ? 'text-work-dark' : ''
        } ${!isToday && weekday !== 0 && weekday !== 6 ? 'text-tico-dark' : ''}`}
      >
        {dayNum}
      </span>

      {events.length === 0 && inMonth && (
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
