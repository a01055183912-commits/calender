import { useEffect, useRef, useState } from 'react'
import { createRecognizer, isSpeechSupported } from '../utils/speech'

interface VoiceButtonProps {
  onResult: (text: string) => void
  label?: string
}

export default function VoiceButton({ onResult, label = '음성으로 일정 등록' }: VoiceButtonProps) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const [error, setError] = useState('')
  const recognizerRef = useRef<any>(null)

  useEffect(() => {
    setSupported(isSpeechSupported())
  }, [])

  const start = () => {
    setError('')
    const recognition = createRecognizer()
    if (!recognition) {
      setSupported(false)
      return
    }
    recognizerRef.current = recognition
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = (e: any) => {
      setListening(false)
      setError(e?.error === 'not-allowed' ? '마이크 권한을 허용해주세요' : '음성 인식에 실패했어요')
    }
    recognition.onresult = (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript ?? ''
      if (text) onResult(text)
    }
    recognition.start()
  }

  const stop = () => {
    recognizerRef.current?.stop()
  }

  if (!supported) {
    return (
      <p className="rounded-xl bg-cream px-3 py-2 text-center text-xs text-tico-brown">
        이 브라우저는 음성 인식을 지원하지 않아요. Chrome 브라우저를 이용해주세요.
      </p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={listening ? stop : start}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-soft transition ${
          listening ? 'bg-anniv text-white animate-pulse' : 'bg-work-light text-work-dark'
        }`}
      >
        <span>{listening ? '🎙️' : '🎤'}</span>
        {listening ? '듣고 있어요...' : label}
      </button>
      {error && <p className="text-xs text-anniv-dark">{error}</p>}
    </div>
  )
}
