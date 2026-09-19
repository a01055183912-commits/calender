export type Category = 'anniv' | 'work' | 'personal'

export const CATEGORY_LABEL: Record<Category, string> = {
  anniv: '기념일',
  work: '업무',
  personal: '개인',
}

export interface LectureInfo {
  orgName: string
  contactPhone: string
  fee: number | ''
  lectureType: string
}

export interface ScheduleEvent {
  id: string
  date: string // yyyy-MM-dd
  time: string // HH:mm, optional (may be '')
  title: string
  memo: string
  category: Category
  isLecture: boolean
  lecture: LectureInfo | null
  createdAt: number
}

export interface TodoItem {
  id: string
  text: string
  done: boolean
  date: string | null // optional linked date yyyy-MM-dd
  createdAt: number
}

export interface AppData {
  events: ScheduleEvent[]
  todos: TodoItem[]
  lectureTypes: string[]
}
