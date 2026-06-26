'use client'

import { MapPin, Monitor, GameController, Trash } from '@phosphor-icons/react'
import { Item } from '@/lib/types'
import { categories } from '@/lib/categories'
import { Avatar } from './Avatar'
import { StatusChip } from './StatusChip'
import { Stars } from './Stars'

interface ItemCardProps {
  item: Item
  onClick: () => void
  onDelete: (id: string) => void
}

export function ItemCard({ item, onClick, onDelete }: ItemCardProps) {
  const cat = categories[item.category]

  function getLocationIcon() {
    if (item.category === 'movies' || item.category === 'shows') return <Monitor size={12} />
    if (item.category === 'games') return <GameController size={12} />
    return <MapPin size={12} />
  }

  const dateStr = new Date(item.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-[22px] p-4 mb-3 cursor-pointer active:scale-[0.99] transition-transform"
      style={{ boxShadow: '0 8px 20px -14px rgba(120,70,30,.4)' }}
    >
      {/* Adder avatar + delete button absolute top-right */}
      <div className="absolute top-4 right-4 flex flex-col items-center gap-1.5">
        <Avatar person={item.addedBy} size={28} />
        <button
          onClick={e => { e.stopPropagation(); onDelete(item.id) }}
          className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
          style={{ background: '#FBF3EA', color: '#C0AB93' }}
          title="Delete"
        >
          <Trash size={14} />
        </button>
      </div>

      {/* Top chips row */}
      <div className="flex items-center gap-2 flex-wrap pr-10">
        <StatusChip status={item.status} />
        {item.location && (
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[8px] text-[11px] font-medium"
            style={{ background: '#F5EDE3', color: '#9A8268' }}
          >
            {getLocationIcon()}
            {item.location}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 pr-8" style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 600, fontSize: 17, color: '#3D2C1E', lineHeight: 1.3 }}>
        {item.title}
      </h3>

      {/* Note */}
      {item.note && (
        <p className="mt-1 line-clamp-2" style={{ fontSize: 13, color: '#9A8268' }}>{item.note}</p>
      )}

      {/* Review quote */}
      {item.review && (
        <p className="mt-2 italic border-l-2 pl-3" style={{ fontSize: 13, color: '#7E6A55', borderColor: '#F0DEC8' }}>
          &ldquo;{item.review}&rdquo;
        </p>
      )}

      {/* Footer */}
      <div className="mt-3 pt-2 flex items-center justify-between border-t" style={{ borderColor: '#F4EADC' }}>
        <div className="flex items-center gap-2">
          <Stars rating={item.rating} size={14} />
          <span style={{ fontSize: 12, color: '#B08861' }}>
            {item.rating ? `${item.rating}.0 together` : 'Not yet rated'}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#B08861' }}>{dateStr}</span>
      </div>
    </div>
  )
}
