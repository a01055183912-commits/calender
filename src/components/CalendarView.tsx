import type { ScheduleEvent } from '../types'
import { getMonthGrid, isCurrentMonth, isSameDay, isToday, toKey } from '../utils/date'
import DayCell from './DayCell'
import MonthHeader from './MonthHeader'

interface CalendarViewProps {
  current: Date
  selected: Date
  events: ScheduleEvent[]
  onSelect: (date: Date) => void
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export default function CalendarView({
  current,
  selected,
  events,
  onSelect,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarViewProps) {
  const days = getMonthGrid(current)
  const eventsByDate = new Map<string, ScheduleEvent[]>()
  for (const e of events) {
    const list = eventsByDate.get(e.date) ?? []
    list.push(e)
    eventsByDate.set(e.date, list)
  }

  return (
    <div className="rounded-2xl bg-white p-2 shadow-soft">
      <MonthHeader current={current} onPrev={onPrevMonth} onNext={onNextMonth} onToday={onToday} />
      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            inMonth={isCurrentMonth(date, current)}
            isToday={isToday(date)}
            isSelected={isSameDay(date, selected)}
            events={eventsByDate.get(toKey(date)) ?? []}
            onClick={() => onSelect(date)}
          />
        ))}
      </div>
    </div>
  )
}
