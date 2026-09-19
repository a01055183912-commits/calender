export default function PawPrint({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="16" r="6" fill="currentColor" />
      <circle cx="4" cy="9" r="3" fill="currentColor" />
      <circle cx="11" cy="4.5" r="3" fill="currentColor" />
      <circle cx="18.5" cy="6.5" r="3" fill="currentColor" />
      <circle cx="21" cy="13" r="2.6" fill="currentColor" />
    </svg>
  )
}
