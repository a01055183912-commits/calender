import type { ScheduleEvent, TodoItem } from '../types'
import { formatDayTitle, daysUntil } from '../utils/date'
import { formatWon } from '../utils/income'
import { lectureTypeColor } from '../utils/lectureColor'
import CategoryTag from './CategoryTag'

interface DayDetailPanelProps {
  date: Date
  events: ScheduleEvent[]
  todos: TodoItem[]
  onAddEvent: () => void
  onEditEvent: (event: ScheduleEvent) => void
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onAddTodo: () => void
}

export default function DayDetailPanel({
  date,
  events,
  todos,
  onAddEvent,
  onEditEvent,
  onToggleTodo,
  onDeleteTodo,
  onAddTodo,
}: DayDetailPanelProps) {
  const sorted = [...events].sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'))

  return (
    <div className="mt-3 rounded-2xl bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-extrabold text-tico-dark">{formatDayTitle(date)}</h3>
        <button
          onClick={onAddEvent}
          className="rounded-full bg-work-DEFAULT px-3 py-1.5 text-xs font-bold text-white shadow-soft"
        >
          + 일정 추가
        </button>
      </div>

      {sorted.length === 0 && (
        <p className="rounded-xl bg-cream/60 px-3 py-3 text-center text-sm text-tico-brown">
          등록된 일정이 없어요. 티모가 기다리고 있어요 🐾
        </p>
      )}

      <ul className="space-y-2">
        {sorted.map((e) => {
          const dLeft = daysUntil(e.date)
          return (
            <li key={e.id}>
              <button
                onClick={() => onEditEvent(e)}
                className="w-full rounded-xl border border-cream p-3 text-left transition active:bg-cream/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryTag category={e.category} />
                    {e.time && <span className="text-xs font-bold text-tico-brown">{e.time}</span>}
                  </div>
                  {e.isLecture && (dLeft === 3 || dLeft === 1) && (
                    <span className="rounded-full bg-anniv-light px-2 py-0.5 text-[11px] font-bold text-anniv-dark">
                      🐕 D-{dLeft}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-bold text-tico-dark">{e.title}</p>
                {e.isLecture && e.lecture && (
                  <div className="mt-1.5 space-y-0.5 text-sm text-tico-brown">
                    {e.lecture.orgName && <p>🏢 {e.lecture.orgName}</p>}
                    {e.lecture.contactPhone && (
                      <a
                        href={`tel:${e.lecture.contactPhone}`}
                        onClick={(ev) => ev.stopPropagation()}
                        className="block w-fit text-work-dark underline"
                      >
                        📞 {e.lecture.contactPhone}
                      </a>
                    )}
                    {e.lecture.fee !== '' && <p>💰 {formatWon(Number(e.lecture.fee))}</p>}
                    <span
                      className="inline-block w-fit rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{
                        backgroundColor: lectureTypeColor(e.lecture.lectureType).bg,
                        color: lectureTypeColor(e.lecture.lectureType).text,
                      }}
                    >
                      {e.lecture.lectureType}
                    </span>
                  </div>
                )}
                {e.memo && <p className="mt-1 text-xs text-tico-brown/80">{e.memo}</p>}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 border-t border-cream pt-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-tico-dark">이 날의 할 일</h4>
          <button onClick={onAddTodo} className="text-xs font-bold text-work-dark">
            + 할 일 추가
          </button>
        </div>
        {todos.length === 0 && <p className="text-xs text-tico-brown/70">할 일이 없어요</p>}
        <ul className="space-y-1.5">
          {todos.map((t) => (
            <li key={t.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => onToggleTodo(t.id)}
                className="h-4 w-4 accent-personal-DEFAULT"
              />
              <span className={`flex-1 text-sm ${t.done ? 'text-tico-brown/40 line-through' : 'text-tico-dark'}`}>
                {t.text}
              </span>
              <button onClick={() => onDeleteTodo(t.id)} className="text-xs text-tico-brown/50">
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
