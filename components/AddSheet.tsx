'use client'

import { useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { Item, Category, Person } from '@/lib/types'
import { categories } from '@/lib/categories'

interface AddSheetProps {
  category: Category
  onClose: () => void
  onAdd: (item: Item) => void
}

const SINGULAR: Record<Category, string> = {
  dates: 'date idea',
  food: 'restaurant',
  movies: 'movie',
  shows: 'show',
  games: 'game',
}

export function AddSheet({ category, onClose, onAdd }: AddSheetProps) {
  const cat = categories[category]
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [location, setLocation] = useState('')
  const [addedBy, setAddedBy] = useState<Person>('Baobao')
  const [visible, setVisible] = useState(false)

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleAdd() {
    if (!title.trim()) return
    onAdd({
      id: Math.random().toString(36).slice(2),
      category,
      title: title.trim(),
      note: note.trim() || undefined,
      location: location.trim() || undefined,
      addedBy,
      status: 'want',
      addedAt: new Date().toISOString(),
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(45,25,10,0.42)', backdropFilter: 'blur(2px)' }}
        onClick={handleClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0"
        style={{
          background: '#FBF3EA',
          borderRadius: '32px 32px 0 0',
          boxShadow: '0 -20px 50px -10px rgba(60,30,10,.4)',
          padding: '8px 20px 40px',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.28s cubic-bezier(0.34,1.06,0.64,1)',
        }}
      >
        <div className="w-10 h-1 bg-[#D4C4B0] rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-1">
          <h2 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 600, fontSize: 22, color: '#3D2C1E' }}>
            New {SINGULAR[category]}
          </h2>
          <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#9A8268]">
            <X size={16} />
          </button>
        </div>
        <p className="mb-4" style={{ fontSize: 13, color: '#9A8268' }}>Add it to your list together</p>

        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's the idea?"
            className="w-full rounded-xl border px-4 py-3 outline-none text-sm"
            style={{ borderColor: '#E7D7C3', background: '#FFFFFF', color: '#3D2C1E' }}
          />
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="A little note..."
            rows={3}
            className="w-full rounded-xl border px-4 py-3 outline-none text-sm resize-none"
            style={{ borderColor: '#E7D7C3', background: '#FFFFFF', color: '#3D2C1E' }}
          />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder={cat.locationLabel}
            className="w-full rounded-xl border px-4 py-3 outline-none text-sm"
            style={{ borderColor: '#E7D7C3', background: '#FFFFFF', color: '#3D2C1E' }}
          />
        </div>

        <p className="mt-4 mb-2 text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#B08861' }}>Who&apos;s adding this?</p>
        <div className="flex gap-3">
          {(['Baobao', 'Michal'] as Person[]).map(p => (
            <button
              key={p}
              onClick={() => setAddedBy(p)}
              className="flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all"
              style={{
                borderColor: addedBy === p ? cat.accent : '#E7D7C3',
                background: addedBy === p ? cat.tint : '#FFFFFF',
                color: addedBy === p ? cat.accent : '#9A8268',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-5 py-3.5 rounded-xl text-white font-semibold text-[15px]"
          style={{ background: 'linear-gradient(135deg,#F0954A,#DB6A2A)' }}
        >
          Add to our list
        </button>
      </div>
    </div>
  )
}
