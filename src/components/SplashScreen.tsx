import DogFace from './DogFace'

interface SplashScreenProps {
  fading: boolean
}

export default function SplashScreen({ fading }: SplashScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-anniv to-work transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <h1 className="animate-splash-pop text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
        티코 캘린더
      </h1>

      <div className="relative flex h-24 w-40 items-end justify-center">
        <div className="animate-timo-dash">
          <DogFace variant="timo" size={76} />
        </div>
        <div className="animate-timo-shadow absolute bottom-2 h-2.5 w-11 rounded-full bg-black/25" />
      </div>

      <p
        className="animate-splash-pop text-lg font-bold text-white drop-shadow-md"
        style={{ animationDelay: '0.15s' }}
      >
        오늘 하루도 화이팅하세요!
      </p>
    </div>
  )
}
