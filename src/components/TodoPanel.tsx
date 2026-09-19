import type { ScheduleEvent, TodoItem } from '../types'
import { format } from 'date-fns'
import CategoryTag from './CategoryTag'

interface TodoPanelProps {
  todos: TodoItem[]
  todayEvents: ScheduleEvent[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onAddTodo: () => void
}

export default function TodoPanel({ todos, todayEvents, onToggleTodo, onDeleteTodo, onAddTodo }: TodoPanelProps) {
  const sorted = [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    return (a.date ?? '9999').localeCompare(b.date ?? '9999')
  })

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <h3 className="mb-2 text-sm font-extrabold text-tico-dark">오늘의 일정</h3>
        {todayEvents.length === 0 ? (
          <p className="text-xs text-tico-brown/70">오늘은 등록된 일정이 없어요</p>
        ) : (
          <ul className="space-y-1.5">
            {todayEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-2 text-sm">
                <CategoryTag category={e.category} />
                <span className="text-tico-dark">{e.title}</span>
                {e.time && <span className="text-xs text-tico-brown/70">{e.time}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-soft">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-tico-dark">할 일 목록</h3>
          <button
            onClick={onAddTodo}
            className="rounded-full bg-personal-DEFAULT px-3 py-1.5 text-xs font-bold text-white shadow-soft"
          >
            + 할 일 추가
          </button>
        </div>

        {sorted.length === 0 && (
          <p className="rounded-xl bg-cream/60 px-3 py-3 text-center text-sm text-tico-brown">
            아직 할 일이 없어요. 코코가 응원해요 🐾
          </p>
        )}

        <ul className="space-y-2">
          {sorted.map((t) => (
            <li key={t.id} className="flex items-center gap-2 rounded-xl border border-cream p-2.5">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => onToggleTodo(t.id)}
                className="h-5 w-5 shrink-0 accent-personal-DEFAULT"
              />
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm ${t.done ? 'text-tico-brown/40 line-through' : 'text-tico-dark'}`}>
                  {t.text}
                </p>
                {t.date && (
                  <p className="text-[11px] text-tico-brown/70">
                    {format(new Date(t.date + 'T00:00:00'), 'M월 d일')}
                  </p>
                )}
              </div>
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
