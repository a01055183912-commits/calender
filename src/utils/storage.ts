import type { AppData } from '../types'

const STORAGE_KEY = 'tico-calendar-data-v1'

const DEFAULT_DATA: AppData = {
  events: [],
  todos: [],
  lectureTypes: ['기관', '기업', '학교'],
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_DATA }
    const parsed = JSON.parse(raw)
    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      lectureTypes:
        Array.isArray(parsed.lectureTypes) && parsed.lectureTypes.length > 0
          ? parsed.lectureTypes
          : DEFAULT_DATA.lectureTypes,
    }
  } catch {
    return { ...DEFAULT_DATA }
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // 저장 공간이 부족하거나 접근이 막힌 경우 조용히 무시
  }
}

export function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
