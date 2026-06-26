'use client'

import { Star } from '@phosphor-icons/react'

interface StarsProps {
  rating?: number
  size?: number
  interactive?: boolean
  onRate?: (rating: number) => void
}

export function Stars({ rating, size = 14, interactive = false, onRate }: StarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          weight={rating && n <= rating ? 'fill' : 'regular'}
          style={{ color: rating && n <= rating ? '#E8A93C' : '#EADCC8', cursor: interactive ? 'pointer' : 'default' }}
          onClick={() => interactive && onRate?.(n)}
        />
      ))}
    </div>
  )
}
