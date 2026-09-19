interface DogFaceProps {
  variant: 'timo' | 'coco'
  size?: number
  className?: string
}

export default function DogFace({ variant, size = 48, className = '' }: DogFaceProps) {
  if (variant === 'timo') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
        <ellipse cx="14" cy="18" rx="8" ry="11" fill="#FFFFFF" stroke="#EDE3D8" strokeWidth="1" transform="rotate(-18 14 18)" />
        <ellipse cx="50" cy="18" rx="8" ry="11" fill="#FFFFFF" stroke="#EDE3D8" strokeWidth="1" transform="rotate(18 50 18)" />
        <circle cx="32" cy="36" r="22" fill="#FFFFFF" stroke="#EDE3D8" strokeWidth="1" />
        <circle cx="24" cy="34" r="3" fill="#5C4433" />
        <circle cx="40" cy="34" r="3" fill="#5C4433" />
        <ellipse cx="32" cy="42" rx="3.2" ry="2.4" fill="#B98A5E" />
        <path d="M28 46 Q32 50 36 46" stroke="#B98A5E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="40" r="3" fill="#FFC9D4" opacity="0.7" />
        <circle cx="48" cy="40" r="3" fill="#FFC9D4" opacity="0.7" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <path d="M10 8 Q4 22 12 32 Q16 20 22 14 Z" fill="#B98A5E" />
      <path d="M54 8 Q60 22 52 32 Q48 20 42 14 Z" fill="#B98A5E" />
      <circle cx="32" cy="36" r="22" fill="#D9AE7E" stroke="#B98A5E" strokeWidth="1" />
      <path d="M14 30 Q32 18 50 30 Q46 20 32 16 Q18 20 14 30 Z" fill="#8C6539" />
      <circle cx="26" cy="7" r="3.5" fill="#FF8FA3" />
      <rect x="24.5" y="6" width="3" height="6" fill="#FF8FA3" transform="rotate(30 26 9)" />
      <circle cx="24" cy="35" r="3" fill="#3B2A1E" />
      <circle cx="40" cy="35" r="3" fill="#3B2A1E" />
      <ellipse cx="32" cy="43" rx="3.2" ry="2.4" fill="#5C4433" />
      <path d="M28 47 Q32 51 36 47" stroke="#5C4433" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
