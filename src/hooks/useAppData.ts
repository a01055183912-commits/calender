import { useCallback, useEffect, useState } from 'react'
import type { AppData, ScheduleEvent, TodoItem } from '../types'
import { loadData, makeId, saveData } from '../utils/storage'

export function useAppData() {
  const [data, setData] = useState<AppData>(() => loadData())

  useEffect(() => {
    saveData(data)
  }, [data])

  const addEvent = useCallback((event: Omit<ScheduleEvent, 'id' | 'createdAt'>) => {
    const newEvent: ScheduleEvent = { ...event, id: makeId(), createdAt: Date.now() }
    setData((prev) => ({ ...prev, events: [...prev.events, newEvent] }))
    return newEvent
  }, [])

  const updateEvent = useCallback((id: string, patch: Partial<ScheduleEvent>) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const deleteEvent = useCallback((id: string) => {
    setData((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }))
  }, [])

  const addTodo = useCallback((text: string, date: string | null) => {
    const newTodo: TodoItem = { id: makeId(), text, done: false, date, createdAt: Date.now() }
    setData((prev) => ({ ...prev, todos: [...prev.todos, newTodo] }))
    return newTodo
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      todos: prev.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }))
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setData((prev) => ({ ...prev, todos: prev.todos.filter((t) => t.id !== id) }))
  }, [])

  const addLectureType = useCallback((type: string) => {
    setData((prev) =>
      prev.lectureTypes.includes(type)
        ? prev
        : { ...prev, lectureTypes: [...prev.lectureTypes, type] }
    )
  }, [])

  return {
    data,
    addEvent,
    updateEvent,
    deleteEvent,
    addTodo,
    toggleTodo,
    deleteTodo,
    addLectureType,
  }
}
