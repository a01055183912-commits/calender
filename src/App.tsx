import { useEffect, useMemo, useState } from 'react'
import CalendarView from './components/CalendarView'
import DayDetailPanel from './components/DayDetailPanel'
import EventModal from './components/EventModal'
import IncomeSummary from './components/IncomeSummary'
import ReminderBanner from './components/ReminderBanner'
import SplashScreen from './components/SplashScreen'
import TodoModal from './components/TodoModal'
import TodoPanel from './components/TodoPanel'
import DogFace from './components/DogFace'
import { useAppData } from './hooks/useAppData'
import type { ScheduleEvent } from './types'
import { addMonths, subMonths, toKey } from './utils/date'

type Tab = 'calendar' | 'todo'

export default function App() {
  const { data, addEvent, updateEvent, deleteEvent, addTodo, toggleTodo, deleteTodo, addLectureType } =
    useAppData()

  const [splashPhase, setSplashPhase] = useState<'show' | 'fade' | 'done'>('show')

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashPhase('fade'), 2000)
    const doneTimer = setTimeout(() => setSplashPhase('done'), 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  const [tab, setTab] = useState<Tab>('calendar')
  const [current, setCurrent] = useState(new Date())
  const [selected, setSelected] = useState(new Date())
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null)
  const [todoModalDate, setTodoModalDate] = useState<string | null | undefined>(undefined)

  const selectedKey = toKey(selected)
  const todayKey = toKey(new Date())

  const monthEvents = useMemo(
    () => data.events.filter((e) => e.date.startsWith(toKey(current).slice(0, 7))),
    [data.events, current]
  )
  const selectedDayEvents = useMemo(
    () => data.events.filter((e) => e.date === selectedKey),
    [data.events, selectedKey]
  )
  const selectedDayTodos = useMemo(
    () => data.todos.filter((t) => t.date === selectedKey),
    [data.todos, selectedKey]
  )
  const todayEvents = useMemo(() => data.events.filter((e) => e.date === todayKey), [data.events, todayKey])

  const reminderPool = useMemo(() => data.events.filter((e) => e.isLecture), [data.events])

  const openNewEvent = () => {
    setEditingEvent(null)
    setEventModalOpen(true)
  }

  const openEditEvent = (event: ScheduleEvent) => {
    setEditingEvent(event)
    setEventModalOpen(true)
  }

  const handleSaveEvent = (payload: Omit<ScheduleEvent, 'id' | 'createdAt'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, payload)
    } else {
      addEvent(payload)
    }
    setEventModalOpen(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id)
    setEventModalOpen(false)
    setEditingEvent(null)
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-cream pb-24">
      {splashPhase !== 'done' && <SplashScreen fading={splashPhase === 'fade'} />}
      <header className="sticky top-0 z-30 bg-cream/95 px-4 pb-2 pt-4 backdrop-blur">
        <div className="mb-3 flex items-center gap-2">
          <DogFace variant="timo" size={32} />
          <DogFace variant="coco" size={32} />
          <h1 className="text-lg font-extrabold text-tico-dark">티코 캘린더</h1>
        </div>

        <div className="mb-3 flex gap-1 rounded-full bg-white p-1 shadow-soft">
          <button
            onClick={() => setTab('calendar')}
            className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
              tab === 'calendar' ? 'bg-work text-white' : 'text-tico-brown'
            }`}
          >
            📅 캘린더
          </button>
          <button
            onClick={() => setTab('todo')}
            className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
              tab === 'todo' ? 'bg-personal text-white' : 'text-tico-brown'
            }`}
          >
            ✅ 할 일
          </button>
        </div>

        <ReminderBanner events={reminderPool} />
      </header>

      <main className="px-4">
        {tab === 'calendar' ? (
          <>
            <div className="mt-3">
              <IncomeSummary current={current} events={data.events} />
            </div>
            <div className="mt-3">
              <CalendarView
                current={current}
                selected={selected}
                events={monthEvents}
                onSelect={setSelected}
                onPrevMonth={() => setCurrent((d) => subMonths(d, 1))}
                onNextMonth={() => setCurrent((d) => addMonths(d, 1))}
                onToday={() => {
                  const now = new Date()
                  setCurrent(now)
                  setSelected(now)
                }}
              />
            </div>
            <DayDetailPanel
              date={selected}
              events={selectedDayEvents}
              todos={selectedDayTodos}
              onAddEvent={openNewEvent}
              onEditEvent={openEditEvent}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onAddTodo={() => setTodoModalDate(selectedKey)}
            />
          </>
        ) : (
          <div className="mt-3">
            <TodoPanel
              todos={data.todos}
              todayEvents={todayEvents}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onAddTodo={() => setTodoModalDate(null)}
            />
          </div>
        )}
      </main>

      {tab === 'calendar' && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 mx-auto flex max-w-md justify-end px-5">
          <button
            onClick={openNewEvent}
            aria-label="일정 추가"
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-work text-3xl font-bold text-white shadow-bubble"
          >
            +
          </button>
        </div>
      )}

      {eventModalOpen && (
        <EventModal
          date={selected}
          editing={editingEvent}
          lectureTypes={data.lectureTypes}
          onAddLectureType={addLectureType}
          onSave={handleSaveEvent}
          onDelete={editingEvent ? handleDeleteEvent : undefined}
          onClose={() => {
            setEventModalOpen(false)
            setEditingEvent(null)
          }}
        />
      )}

      {todoModalDate !== undefined && (
        <TodoModal
          defaultDate={todoModalDate}
          onSave={(text, date) => {
            addTodo(text, date)
            setTodoModalDate(undefined)
          }}
          onClose={() => setTodoModalDate(undefined)}
        />
      )}
    </div>
  )
}
