import type { ScheduleEvent } from '../types'
import { daysUntil } from '../utils/date'
import CharacterBubble from './CharacterBubble'

interface ReminderBannerProps {
  events: ScheduleEvent[]
}

export default function ReminderBanner({ events }: ReminderBannerProps) {
  const upcoming = events
    .filter((e) => e.isLecture)
    .map((e) => ({ e, d: daysUntil(e.date) }))
    .filter(({ d }) => d === 1 || d === 3)
    .sort((a, b) => a.d - b.d)

  const todayEvents = events.filter((e) => daysUntil(e.date) === 0)

  if (upcoming.length === 0 && todayEvents.length === 0) {
    return (
      <CharacterBubble
        character="timo"
        name="티모"
        message="오늘도 좋은 하루! 새 일정을 등록해볼까요?"
      />
    )
  }

  return (
    <div className="space-y-2">
      {todayEvents.length > 0 && (
        <CharacterBubble
          character="timo"
          name="티모"
          message={`오늘 "${todayEvents[0].title}" 일정이 있어요!${
            todayEvents.length > 1 ? ` 외 ${todayEvents.length - 1}건` : ''
          }`}
        />
      )}
      {upcoming.map(({ e, d }) => (
        <CharacterBubble
          key={e.id}
          character="coco"
          name="코코"
          tone="alert"
          message={`"${e.title}" 강의가 ${d}일 남았어요! (D-${d}) 담당기관: ${
            e.lecture?.orgName || '미입력'
          }`}
        />
      ))}
    </div>
  )
}
