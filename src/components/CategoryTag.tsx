import type { Category } from '../types'
import { CATEGORY_LABEL } from '../types'

const STYLE: Record<Category, string> = {
  anniv: 'bg-anniv-light text-anniv-dark',
  work: 'bg-work-light text-work-dark',
  personal: 'bg-personal-light text-personal-dark',
}

export const CATEGORY_DOT: Record<Category, string> = {
  anniv: 'bg-anniv-DEFAULT',
  work: 'bg-work-DEFAULT',
  personal: 'bg-personal-DEFAULT',
}

export default function CategoryTag({ category }: { category: Category }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STYLE[category]}`}>
      {CATEGORY_LABEL[category]}
    </span>
  )
}
