'use client'

import { useEffect, useState, useRef } from 'react'
import { X, MapPin, Monitor, GameController, Star } from '@phosphor-icons/react'
import { Item, Status, Category } from '@/lib/types'
import { categories } from '@/lib/categories'
import { Avatar } from './Avatar'
import { StatusChip } from './StatusChip'

interface ItemDetailSheetProps {
  item: Item
  onClose: () => void
  onSave: (updates: Partial<Item>) => void
  onDelete: (id: string) => void
}

export function ItemDetailSheet({ item, onClose, onSave, onDelete }: ItemDetailSheetProps) {
  const cat = categories[item.category]
  const [status, setStatus] = useState<Status>(item.status)
  const [rating, setRating] = useState<number | undefined>(item.rating)
  const [review, setReview] = useState(item.review ?? '')
  const [hoverRating, setHoverRating] = useState<number | undefined>()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleSave() {
    const updates: Partial<Item> = { status }
    if (status === 'done' || status === 'fav') {
      updates.rating = rating
      updates.review = review
    } else {
      updates.rating = undefined
      updates.review = undefined
    }
    onSave(updates)
    handleClose()
  }

  function getLocationIcon() {
    if (item.category === 'movies' || item.category === 'shows') return <Monitor size={13} />
    if (item.category === 'games') return <GameController size={13} />
    return <MapPin size={13} />
  }

  const statusOptions: { value: Status; label: string; icon: string }[] = [
    { value: 'want', label: cat.wantLabel, icon: '✦' },
    { value: 'done', label: cat.doneLabel, icon: '✓' },
    { value: 'fav', label: 'Loved it', icon: '♥' },
  ]

  const showRating = status === 'done' || status === 'fav'
  const displayRating = hoverRating ?? rating

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(45,25,10,0.42)', backdropFilter: 'blur(2px)' }}
        onClick={handleClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 overflow-y-auto"
        style={{
          background: '#FBF3EA',
          borderRadius: '32px 32px 0 0',
          boxShadow: '0 -20px 50px -10px rgba(60,30,10,.4)',
          maxHeight: '80vh',
          padding: '8px 20px 40px',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.28s cubic-bezier(0.34,1.06,0.64,1)',
        }}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-[#D4C4B0] rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[12px] font-semibold"
              style={{ background: cat.tint, color: cat.accent }}
            >
              {cat.label}
            </span>
            <StatusChip status={item.status} />
          </div>
          <div className="flex items-center gap-2">
            <Avatar person={item.addedBy} size={30} />
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#9A8268]">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: 25, color: '#3D2C1E', lineHeight: 1.2 }}>
          {item.title}
        </h2>

        {/* Location */}
        {item.location && (
          <div className="flex items-center gap-1.5 mt-2" style={{ color: '#9A8268', fontSize: 13 }}>
            {getLocationIcon()}
            <span>{item.location}</span>
          </div>
        )}

        {/* Note */}
        {item.note && (
          <p className="mt-1" style={{ fontSize: 13, color: '#9A8268' }}>{item.note}</p>
        )}

        {/* Status selector */}
        <div className="mt-5">
          <p className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#B08861' }}>Where are we at?</p>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map(opt => {
              const selected = status === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className="flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all"
                  style={{
                    borderColor: selected ? cat.accent : '#E7D7C3',
                    background: selected ? cat.tint : '#FFFFFF',
                    color: selected ? cat.accent : '#9A8268',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{opt.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Rating & Review */}
        {showRating && (
          <div className="mt-4 bg-white rounded-2xl p-4">
            <p className="text-[12px] font-semibold mb-3" style={{ color: '#7E6A55' }}>{cat.reviewPrompt}</p>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(n => (
                <Star
                  key={n}
                  size={32}
                  weight={displayRating && n <= displayRating ? 'fill' : 'regular'}
                  style={{ color: displayRating && n <= displayRating ? '#E8A93C' : '#EADCC8', cursor: 'pointer' }}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(undefined)}
                  onClick={() => setRating(n)}
                />
              ))}
            </div>
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="Write something about it..."
              rows={3}
              className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none"
              style={{ borderColor: '#E7D7C3', background: '#FDFAF7', color: '#3D2C1E', fontSize: 13 }}
            />
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full mt-4 py-3.5 rounded-xl text-white font-semibold text-[15px]"
          style={{ background: 'linear-gradient(135deg,#F0954A,#DB6A2A)' }}
        >
          {showRating ? 'Save our memory' : 'Save'}
        </button>

        {/* Delete */}
        <button
          onClick={() => { onDelete(item.id); handleClose() }}
          className="w-full mt-3 py-2.5 text-[13px] font-medium"
          style={{ color: '#C0AB93' }}
        >
          Remove from list
        </button>
      </div>
    </div>
  )
}
