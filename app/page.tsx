'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Shuffle, Sparkle, CaretRight, PushPin } from '@phosphor-icons/react'
import { useItems, getGreeting } from '@/lib/data'
import { categories } from '@/lib/categories'
import { Category } from '@/lib/types'
import { Avatar } from '@/components/Avatar'
import { StatusChip } from '@/components/StatusChip'
import { SurpriseSheet } from '@/components/SurpriseSheet'
import { getCategoryIcon } from '@/components/CategoryIcon'

const CATEGORY_ORDER: Category[] = ['dates', 'food', 'movies', 'shows', 'games']

export default function Home() {
  const { items } = useItems()
  const [showSurprise, setShowSurprise] = useState(false)

  const greeting = getGreeting()

  const stats = useMemo(() => {
    const total = items.length
    const catCounts: Record<Category, { total: number; done: number }> = {
      dates: { total: 0, done: 0 },
      food: { total: 0, done: 0 },
      movies: { total: 0, done: 0 },
      shows: { total: 0, done: 0 },
      games: { total: 0, done: 0 },
    }
    items.forEach(item => {
      catCounts[item.category].total++
      if (item.status === 'done' || item.status === 'fav') catCounts[item.category].done++
    })
    return { total, catCounts }
  }, [items])

  const latestDateIdea = useMemo(() => {
    return items
      .filter(i => i.category === 'dates')
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())[0]
  }, [items])

  return (
    <div className="min-h-screen" style={{ background: '#FBF3EA' }}>
      <div className="mx-auto" style={{ maxWidth: 440, padding: '0 20px' }}>

        {/* Greeting header */}
        <div className="flex items-start justify-between pt-14 pb-2">
          <div>
            <p style={{ fontSize: 13, color: '#B08861', fontWeight: 500 }}>{greeting}</p>
            <h1 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: 27, color: '#3D2C1E', lineHeight: 1.2 }}>
              Baobao & Michal
            </h1>
            <p style={{ fontSize: 14, color: '#9A8268', marginTop: 2 }}>What are we doing tonight?</p>
          </div>
          <div className="flex items-center mt-1">
            <Avatar person="Baobao" size={38} />
            <Avatar person="Michal" size={38} className="-ml-[13px]" />
          </div>
        </div>

        {/* Surprise hero card */}
        <div
          className="mt-6 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
          style={{
            background: 'linear-gradient(135deg, #F4A04C 0%, #E0792F 55%, #CF6322 100%)',
            borderRadius: 26,
            padding: '20px 20px',
            boxShadow: '0 16px 30px -12px rgba(210,95,25,.6)',
          }}
          onClick={() => setShowSurprise(true)}
        >
          <div className="absolute top-4 right-20 pointer-events-none sparkle-float" style={{ animationDelay: '0s' }}>
            <Sparkle size={18} color="rgba(255,255,255,0.2)" weight="fill" />
          </div>
          <div className="absolute bottom-5 right-28 pointer-events-none sparkle-float" style={{ animationDelay: '1.5s' }}>
            <Sparkle size={12} color="rgba(255,255,255,0.2)" weight="fill" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                CAN&apos;T DECIDE?
              </p>
              <h2 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: 23, color: '#FFFFFF', marginTop: 2, lineHeight: 1.2 }}>
                Surprise us tonight
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                We&apos;ll pick something from your lists
              </p>
            </div>
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 62, height: 62, background: '#FFFFFF' }}
            >
              <Shuffle size={28} style={{ color: '#E0792F' }} weight="bold" />
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center justify-between mt-6">
          <p style={{ fontSize: 16, fontWeight: 700, color: '#3D2C1E' }}>Our lists</p>
          <p style={{ fontSize: 13, color: '#B08861' }}>{stats.total} saved together</p>
        </div>

        {/* Lists grid */}
        <div className="mt-3 grid grid-cols-2" style={{ gap: 13 }}>

          {/* Date Ideas — col-span-2 */}
          <Link href="/dates" className="col-span-2">
            <div
              className="bg-white cursor-pointer active:scale-[0.99] transition-transform"
              style={{ borderRadius: 22, boxShadow: '0 8px 20px -14px rgba(120,70,30,.4)', padding: 16 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-[14px] flex-shrink-0"
                  style={{ width: 44, height: 44, background: categories.dates.tint }}
                >
                  {(() => { const Icon = getCategoryIcon('dates'); return <Icon size={22} style={{ color: categories.dates.accent }} /> })()}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 600, fontSize: 18, color: '#3D2C1E' }}>Date Ideas</p>
                  <p style={{ fontSize: 12, color: '#B08861' }}>{categories.dates.countLabel(stats.catCounts.dates.total, stats.catCounts.dates.done)}</p>
                </div>
                <CaretRight size={18} style={{ color: '#B08861' }} />
              </div>

              {latestDateIdea && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#F4EADC' }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[8px] text-[11px] font-semibold flex-shrink-0"
                      style={{ background: '#FBE0C9', color: '#DB6A2A' }}
                    >
                      <PushPin size={11} />
                      Latest
                    </span>
                    <span className="flex-1 truncate" style={{ fontSize: 13, color: '#7E6A55' }}>
                      {latestDateIdea.title}
                    </span>
                    <Avatar person={latestDateIdea.addedBy} size={22} />
                  </div>
                </div>
              )}
            </div>
          </Link>

          {/* Remaining 4 categories */}
          {CATEGORY_ORDER.slice(1).map(cat => {
            const config = categories[cat]
            const Icon = getCategoryIcon(cat)
            const latest = items
              .filter(i => i.category === cat)
              .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())[0]
            const { total, done } = stats.catCounts[cat]
            return (
              <Link key={cat} href={config.route}>
                <div
                  className="bg-white cursor-pointer active:scale-[0.99] transition-transform flex flex-col"
                  style={{ borderRadius: 22, boxShadow: '0 8px 20px -14px rgba(120,70,30,.4)', padding: 16, minHeight: 132 }}
                >
                  <div
                    className="flex items-center justify-center rounded-[14px] self-start"
                    style={{ width: 44, height: 44, background: config.tint }}
                  >
                    <Icon size={22} style={{ color: config.accent }} />
                  </div>
                  <div className="mt-auto pt-3">
                    <p style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 600, fontSize: 15, color: '#3D2C1E' }}>{config.label}</p>
                    <p style={{ fontSize: 11, color: '#B08861', marginTop: 1 }}>{config.countLabel(total, done)}</p>
                    {latest && (
                      <div className="mt-2">
                        <StatusChip status={latest.status} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <p className="text-center mt-8 pb-10" style={{ fontSize: 12, color: '#C4A882' }}>
          Made for us · est. 2024 ♥
        </p>
      </div>

      {showSurprise && (
        <SurpriseSheet items={items} onClose={() => setShowSurprise(false)} />
      )}
    </div>
  )
}
