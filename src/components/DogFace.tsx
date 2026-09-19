import { wavyBlobPath } from './fluffyPath'

interface DogFaceProps {
  variant: 'timo' | 'coco'
  size?: number
  className?: string
}

const OUTLINE = '#8A6F52'
const OUTLINE_DARK = '#6B5640'

// 미리 계산해두는 복슬복슬한 실루엣 경로 (모듈 로드 시 1회만 계산)
const TIMO_EAR_L = wavyBlobPath(13, 40, 9, 5, 1.1)
const TIMO_EAR_R = wavyBlobPath(51, 40, 9, 5, 1.1)
const TIMO_HEAD = wavyBlobPath(32, 33, 19.5, 6, 1.7)

const COCO_FRINGE = wavyBlobPath(32, 21, 11, 5, 1.2)
const COCO_HEAD = wavyBlobPath(32, 36, 18.5, 6, 1.4)

export default function DogFace({ variant, size = 48, className = '' }: DogFaceProps) {
  if (variant === 'timo') {
    // 티모 - 복슬복슬한 말티즈/비숑 스타일
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
        {/* 귀 (얼굴 뒤로 살짝 삐져나오는 털뭉치) */}
        <path d={TIMO_EAR_L} fill="#FFFFFF" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
        <path d={TIMO_EAR_R} fill="#FFFFFF" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
        {/* 복슬복슬한 얼굴 실루엣 */}
        <path d={TIMO_HEAD} fill="#FFFFFF" stroke={OUTLINE} strokeWidth="2.4" strokeLinejoin="round" />

        {/* 볼터치 */}
        <ellipse cx="19" cy="41" rx="4" ry="2.8" fill="#FFC2CE" opacity="0.8" />
        <ellipse cx="45" cy="41" rx="4" ry="2.8" fill="#FFC2CE" opacity="0.8" />

        {/* 큰 눈망울 */}
        <ellipse cx="24.5" cy="35" rx="4.1" ry="4.8" fill="#3A2C22" />
        <ellipse cx="39.5" cy="35" rx="4.1" ry="4.8" fill="#3A2C22" />
        <circle cx="23" cy="32.6" r="1.5" fill="#FFFFFF" />
        <circle cx="38" cy="32.6" r="1.5" fill="#FFFFFF" />
        <circle cx="26.2" cy="37" r="0.8" fill="#FFFFFF" opacity="0.85" />
        <circle cx="41.2" cy="37" r="0.8" fill="#FFFFFF" opacity="0.85" />

        {/* 눈썹 살짝 (걱정스러운 강아지 눈) */}
        <path d="M20.5 28.5 Q24.5 26.5 28 28.5" stroke={OUTLINE} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M36 28.5 Q39.5 26.5 43.5 28.5" stroke={OUTLINE} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />

        {/* 코 & 입 */}
        <path d="M29.6 42.5 Q32 40.6 34.4 42.5 Q34.2 45 32 45.2 Q29.8 45 29.6 42.5Z" fill={OUTLINE_DARK} />
        <path d="M32 45.2 L32 46.8" stroke={OUTLINE_DARK} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M26.5 48.5 Q32 52.5 37.5 48.5" stroke={OUTLINE_DARK} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      </svg>
    )
  }

  // 코코 - 요크셔테리어
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      {/* 쫑긋한 귀 */}
      <path d="M14 6 C10 16 12 24 18 27 C19 19 21 13 23 9 C20 6 17 5 14 6Z" fill="#6B6459" stroke={OUTLINE_DARK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 6 C54 16 52 24 46 27 C45 19 43 13 41 9 C44 6 47 5 50 6Z" fill="#6B6459" stroke={OUTLINE_DARK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9 C14 15 15 20 18 23 C18.5 17 20 13 21 10 C19.5 9 18 8.5 16 9Z" fill="#E7C79A" />
      <path d="M48 9 C50 15 49 20 46 23 C45.5 17 44 13 43 10 C44.5 9 46 8.5 48 9Z" fill="#E7C79A" />

      {/* 복슬복슬한 얼굴 (탄 컬러) */}
      <path d={COCO_HEAD} fill="#EFCB9F" stroke={OUTLINE_DARK} strokeWidth="2.2" strokeLinejoin="round" />
      {/* 이마 앞머리 (그레이, 복슬) */}
      <path d={COCO_FRINGE} fill="#8F8778" stroke={OUTLINE_DARK} strokeWidth="2" strokeLinejoin="round" />

      {/* 리본 */}
      <ellipse cx="20" cy="9" rx="4.2" ry="3.2" fill="#FF8FA3" stroke={OUTLINE_DARK} strokeWidth="1.3" transform="rotate(-18 20 9)" />
      <ellipse cx="30" cy="9" rx="4.2" ry="3.2" fill="#FF8FA3" stroke={OUTLINE_DARK} strokeWidth="1.3" transform="rotate(18 30 9)" />
      <circle cx="25" cy="9.5" r="2.2" fill="#E5657E" stroke={OUTLINE_DARK} strokeWidth="1.1" />

      {/* 볼터치 */}
      <ellipse cx="19" cy="42" rx="3.6" ry="2.6" fill="#FFC2CE" opacity="0.8" />
      <ellipse cx="45" cy="42" rx="3.6" ry="2.6" fill="#FFC2CE" opacity="0.8" />

      {/* 큰 눈망울 */}
      <ellipse cx="24.5" cy="37" rx="3.9" ry="4.6" fill="#2B1F17" />
      <ellipse cx="39.5" cy="37" rx="3.9" ry="4.6" fill="#2B1F17" />
      <circle cx="23.2" cy="34.6" r="1.4" fill="#FFFFFF" />
      <circle cx="38.2" cy="34.6" r="1.4" fill="#FFFFFF" />
      <circle cx="26" cy="38.8" r="0.7" fill="#FFFFFF" opacity="0.85" />
      <circle cx="41" cy="38.8" r="0.7" fill="#FFFFFF" opacity="0.85" />

      {/* 코 & 입 */}
      <path d="M29.8 44.5 Q32 42.6 34.2 44.5 Q34 47 32 47.2 Q30 47 29.8 44.5Z" fill={OUTLINE_DARK} />
      <path d="M32 47.2 L32 48.8" stroke={OUTLINE_DARK} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M26.5 50.5 Q32 54.5 37.5 50.5" stroke={OUTLINE_DARK} strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </svg>
  )
}
