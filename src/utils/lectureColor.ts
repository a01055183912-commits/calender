const PALETTE = [
  { bg: '#FFD6E0', text: '#E0114F' }, // 코랄핑크
  { bg: '#CFE3FF', text: '#1552C4' }, // 블루
  { bg: '#CFF5DA', text: '#0E8C45' }, // 그린
  { bg: '#FFEDB3', text: '#B8790B' }, // 옐로우
  { bg: '#E7DBFF', text: '#6A3FD1' }, // 퍼플
  { bg: '#FFDCC2', text: '#D9611A' }, // 오렌지
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function lectureTypeColor(type: string): { bg: string; text: string } {
  if (!type) return PALETTE[0]
  return PALETTE[hashString(type) % PALETTE.length]
}
