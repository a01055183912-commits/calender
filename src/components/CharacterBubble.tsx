import DogFace from './DogFace'

interface CharacterBubbleProps {
  character: 'timo' | 'coco'
  name: string
  message: string
  tone?: 'default' | 'alert'
}

export default function CharacterBubble({ character, name, message, tone = 'default' }: CharacterBubbleProps) {
  return (
    <div className="flex items-start gap-2">
      <div
        className={`shrink-0 rounded-full p-1 shadow-soft ${
          character === 'timo' ? 'bg-anniv-light' : 'bg-work-light'
        }`}
      >
        <DogFace variant={character} size={40} />
      </div>
      <div
        className={`relative rounded-2xl px-3 py-2 text-sm shadow-bubble ${
          tone === 'alert' ? 'bg-anniv-light text-tico-dark' : 'bg-white text-tico-dark'
        }`}
      >
        <span className="mr-1 font-bold">{name}</span>
        <span className="align-middle">{message}</span>
      </div>
    </div>
  )
}
