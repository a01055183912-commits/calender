interface DogFaceProps {
  variant: 'timo' | 'coco'
  size?: number
  className?: string
}

const STROKE = '#3A3128'

export default function DogFace({ variant, size = 48, className = '' }: DogFaceProps) {
  if (variant === 'timo') {
    // 티모 - 하얗고 복슬복슬한 말티즈
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
        {/* 늘어진 귀 */}
        <path
          d="M13 16 C4 20 4 34 14 38 C18 32 18 22 20 18 C18 15 15 15 13 16Z"
          fill="#FFFFFF"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M51 16 C60 20 60 34 50 38 C46 32 46 22 44 18 C46 15 49 15 51 16Z"
          fill="#FFFFFF"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 정수리 삐친 털 */}
        <path
          d="M26 12 C27 7 31 5 32 9 C33 5 37 7 38 12 C36 10 34 11 33 13 C32 11 28 10 26 12Z"
          fill="#FFFFFF"
          stroke={STROKE}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 얼굴 */}
        <circle cx="32" cy="35" r="20" fill="#FFFFFF" stroke={STROKE} strokeWidth="2.2" />
        {/* 볼살 뽀글이 */}
        <circle cx="15" cy="38" r="5" fill="#FFFFFF" stroke={STROKE} strokeWidth="1.6" />
        <circle cx="49" cy="38" r="5" fill="#FFFFFF" stroke={STROKE} strokeWidth="1.6" />
        {/* 볼터치 */}
        <ellipse cx="18" cy="40" rx="3.4" ry="2.4" fill="#FFC9D4" opacity="0.85" />
        <ellipse cx="46" cy="40" rx="3.4" ry="2.4" fill="#FFC9D4" opacity="0.85" />
        {/* 눈 */}
        <ellipse cx="25" cy="33" rx="2.6" ry="3.2" fill={STROKE} />
        <ellipse cx="39" cy="33" rx="2.6" ry="3.2" fill={STROKE} />
        <circle cx="24" cy="31.6" r="0.9" fill="#FFFFFF" />
        <circle cx="38" cy="31.6" r="0.9" fill="#FFFFFF" />
        {/* 코 & 입 */}
        <ellipse cx="32" cy="40" rx="2.6" ry="2" fill={STROKE} />
        <path d="M32 42 L32 44" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M27 46 Q32 49.5 37 46" stroke={STROKE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    )
  }

  // 코코 - 요크셔테리어
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      {/* 쫑긋한 귀 */}
      <path d="M14 6 C10 16 12 24 18 27 C19 19 21 13 23 9 C20 6 17 5 14 6Z" fill="#6B6459" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 6 C54 16 52 24 46 27 C45 19 43 13 41 9 C44 6 47 5 50 6Z" fill="#6B6459" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9 C14 15 15 20 18 23 C18.5 17 20 13 21 10 C19.5 9 18 8.5 16 9Z" fill="#E7C79A" />
      <path d="M48 9 C50 15 49 20 46 23 C45.5 17 44 13 43 10 C44.5 9 46 8.5 48 9Z" fill="#E7C79A" />
      {/* 얼굴 (탄 컬러) */}
      <circle cx="32" cy="36" r="20" fill="#EAC79C" stroke={STROKE} strokeWidth="2.2" />
      {/* 정수리~이마 앞머리 (그레이) */}
      <path
        d="M13 30 C18 16 30 12 32 18 C34 12 46 16 51 30 C44 22 36 20 32 26 C28 20 20 22 13 30Z"
        fill="#8A8378"
        stroke={STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 리본 */}
      <ellipse cx="20" cy="9" rx="4.2" ry="3.2" fill="#FF8FA3" stroke={STROKE} strokeWidth="1.3" transform="rotate(-18 20 9)" />
      <ellipse cx="30" cy="9" rx="4.2" ry="3.2" fill="#FF8FA3" stroke={STROKE} strokeWidth="1.3" transform="rotate(18 30 9)" />
      <circle cx="25" cy="9.5" r="2.2" fill="#E5657E" stroke={STROKE} strokeWidth="1.1" />
      {/* 눈 */}
      <ellipse cx="25" cy="36" rx="2.6" ry="3.2" fill={STROKE} />
      <ellipse cx="39" cy="36" rx="2.6" ry="3.2" fill={STROKE} />
      <circle cx="24" cy="34.6" r="0.9" fill="#FFFFFF" />
      <circle cx="38" cy="34.6" r="0.9" fill="#FFFFFF" />
      {/* 코 & 입 */}
      <ellipse cx="32" cy="43" rx="2.8" ry="2.1" fill={STROKE} />
      <path d="M32 45 L32 47" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 49 Q32 52.5 37 49" stroke={STROKE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}
