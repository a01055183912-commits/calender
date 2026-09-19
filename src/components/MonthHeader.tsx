import { WEEKDAY_LABELS, formatMonthTitle } from '../utils/date'

interface MonthHeaderProps {
  current: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export default function MonthHeader({ current, onPrev, onNext, onToday }: MonthHeaderProps) {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-1 py-2">
        <button
          onClick={onPrev}
          aria-label="이전 달"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-tico-brown active:bg-anniv-light"
        >
          ‹
        </button>
        <button onClick={onToday} className="text-lg font-bold text-tico-dark">
          {formatMonthTitle(current)}
        </button>
        <button
          onClick={onNext}
          aria-label="다음 달"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-tico-brown active:bg-anniv-light"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 px-1 text-center text-sm font-bold text-tico-dark/70">
        {WEEKDAY_LABELS.map((d, i) => (
          <div key={d} className={i === 0 || i === 6 ? 'text-holiday' : ''}>
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}
