'use client'

import { Person } from '@/lib/types'

interface AvatarProps {
  person: Person
  size?: number
  className?: string
}

export function Avatar({ person, size = 32, className = '' }: AvatarProps) {
  const bg = person === 'Baobao' ? '#D8633A' : '#CC9A3E'
  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold text-white flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38, border: '2px solid #FBF3EA' }}
    >
      {person[0]}
    </div>
  )
}
