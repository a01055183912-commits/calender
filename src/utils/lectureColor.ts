const PALETTE = [
  { bg: '#FFE3E9', text: '#E5657E' }, // 코랄핑크
  { bg: '#DCEBFF', text: '#3D7BE0' }, // 블루
  { bg: '#DFF6E3', text: '#3FAE6B' }, // 민트그린
  { bg: '#FFF2CC', text: '#B8860B' }, // 옐로우
  { bg: '#E9E1FF', text: '#7B61C4' }, // 라벤더
  { bg: '#FFE0CC', text: '#D97B3F' }, // 피치오렌지
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
