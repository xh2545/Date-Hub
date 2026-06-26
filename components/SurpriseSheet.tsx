'use client'

import { useEffect, useState } from 'react'
import { Shuffle } from '@phosphor-icons/react'
import { Item } from '@/lib/types'
import { categories } from '@/lib/categories'
import { Avatar } from './Avatar'
import { StatusChip } from './StatusChip'
import { getCategoryIcon } from './CategoryIcon'
import { useRouter } from 'next/navigation'

interface SurpriseSheetProps {
  items: Item[]
  onClose: () => void
}

function pickRandom(items: Item[], exclude?: Item): Item {
  const pool = items.length > 1 ? items.filter(i => i !== exclude) : items
  return pool[Math.floor(Math.random() * pool.length)]
}

export function SurpriseSheet({ items, onClose }: SurpriseSheetProps) {
  const wantItems = items.filter(i => i.status === 'want')
  const [pick, setPick] = useState<Item>(() => pickRandom(wantItems.length > 0 ? wantItems : items))
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleShuffle() {
    const pool = wantItems.length > 0 ? wantItems : items
    setPick(pickRandom(pool, pick))
  }

  function handleGo() {
    const cat = categories[pick.category]
    handleClose()
    setTimeout(() => router.push(cat.route), 300)
  }

  const cat = categories[pick.category]
  const Icon = getCategoryIcon(pick.category)

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
        <div className="w-10 h-1 bg-[#D4C4B0] rounded-full mx-auto mb-5" />

        {/* Category pill */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[12px] font-semibold"
            style={{ background: cat.tint, color: cat.accent }}
          >
            <Icon size={13} />
            {cat.label}
          </span>
        </div>

        <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: '#B08861' }}>Tonight&apos;s pick</p>

        <h2 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: 27, color: '#3D2C1E', lineHeight: 1.2 }}>
          {pick.title}
        </h2>

        {/* Added by row */}
        <div className="flex items-center gap-2 mt-3">
          <Avatar person={pick.addedBy} size={28} />
          <span style={{ fontSize: 13, color: '#7E6A55' }}>Added by {pick.addedBy}</span>
          <StatusChip status={pick.status} />
        </div>

        {pick.location && (
          <p className="mt-1" style={{ fontSize: 13, color: '#9A8268' }}>{pick.location}</p>
        )}

        {pick.note && (
          <p className="mt-1 italic" style={{ fontSize: 13, color: '#9A8268' }}>&ldquo;{pick.note}&rdquo;</p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleShuffle}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-[14px]"
            style={{ borderColor: '#DB6A2A', color: '#DB6A2A' }}
          >
            <Shuffle size={18} />
            Shuffle again
          </button>
          <button
            onClick={handleGo}
            className="flex-1 py-3 rounded-xl font-semibold text-[14px] text-white"
            style={{ background: 'linear-gradient(135deg,#F0954A,#DB6A2A)' }}
          >
            Let&apos;s do it ✦
          </button>
        </div>
      </div>
    </div>
  )
}
