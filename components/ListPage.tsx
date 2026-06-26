'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { CaretLeft, Plus, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Category, Item, Status } from '@/lib/types'
import { categories } from '@/lib/categories'
import { useItems } from '@/lib/data'
import { Avatar } from './Avatar'
import { ItemCard } from './ItemCard'
import { ItemDetailSheet } from './ItemDetailSheet'
import { AddSheet } from './AddSheet'
import { getCategoryIcon } from './CategoryIcon'

type FilterTab = 'all' | Status

interface TabConfig {
  key: FilterTab
  label: string
}

const TABS: TabConfig[] = [
  { key: 'all', label: 'All' },
  { key: 'want', label: 'Want' },
  { key: 'done', label: 'Done' },
  { key: 'fav', label: 'Loved' },
]

export function ListPage({ category }: { category: Category }) {
  const router = useRouter()
  const { items, addItem, updateItem, deleteItem } = useItems()
  const cat = categories[category]
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')

  const catItems = useMemo(() => items.filter(i => i.category === category), [items, category])

  const filtered = useMemo(() => {
    let list = activeTab === 'all' ? catItems : catItems.filter(i => i.status === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.note?.toLowerCase().includes(q) ||
        i.location?.toLowerCase().includes(q)
      )
    }
    return list
  }, [catItems, activeTab, search])

  const tabCounts = useMemo(() => ({
    all: catItems.length,
    want: catItems.filter(i => i.status === 'want').length,
    done: catItems.filter(i => i.status === 'done').length,
    fav: catItems.filter(i => i.status === 'fav').length,
  }), [catItems])

  const doneCount = catItems.filter(i => i.status === 'done' || i.status === 'fav').length
  const Icon = getCategoryIcon(category)

  return (
    <div className="min-h-screen" style={{ background: '#FBF3EA' }}>
      {/* Fixed header */}
      <div className="sticky top-0 z-10 px-5 pt-4 pb-3" style={{ background: '#FBF3EA' }}>
        {/* Row 1 */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center bg-white rounded-xl"
            style={{ boxShadow: '0 2px 8px rgba(120,70,30,.15)' }}
          >
            <CaretLeft size={20} style={{ color: '#3D2C1E' }} />
          </button>
          <div className="flex items-center">
            <Avatar person="Baobao" size={34} />
            <Avatar person="Michal" size={34} className="-ml-[13px]" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-11 h-11 flex items-center justify-center rounded-[14px] flex-shrink-0"
            style={{ background: cat.tint }}
          >
            <Icon size={22} style={{ color: cat.accent }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: 27, color: '#3D2C1E', lineHeight: 1.1 }}>
              {cat.label}
            </h1>
            <p style={{ fontSize: 12, color: '#B08861' }}>{cat.countLabel(catItems.length, doneCount)}</p>
          </div>
        </div>

        {/* Row 3 — filter tabs */}
        <div className="flex items-center gap-2">
          {TABS.map(tab => {
            const active = activeTab === tab.key
            const count = tabCounts[tab.key]
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-3 py-1.5 rounded-[10px] text-[13px] font-semibold transition-all"
                style={{
                  background: active ? cat.accent : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#9A8268',
                  boxShadow: active ? 'none' : '0 2px 6px rgba(120,70,30,.1)',
                }}
              >
                {tab.label} {count > 0 && <span style={{ opacity: 0.75 }}>·{count}</span>}
              </button>
            )
          })}
        </div>

        {/* Search bar */}
        <div className="relative mt-3">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#B08861' }}
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-9 py-2.5 rounded-[12px] text-[13px] outline-none"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid',
              borderColor: search ? cat.accent : '#E7D7C3',
              color: '#3D2C1E',
              boxShadow: '0 2px 6px rgba(120,70,30,.08)',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: '#B08861' }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable list */}
      <div className="px-5 pt-2 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20" style={{ color: '#B08861' }}>
            <p style={{ fontSize: 40 }}>✦</p>
            <p style={{ fontSize: 15, fontWeight: 600, marginTop: 8 }}>Nothing here yet</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Tap the + to add something</p>
          </div>
        ) : (
          filtered.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
              onDelete={id => { deleteItem(id); if (selectedItem?.id === id) setSelectedItem(null) }}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-xl"
        style={{ background: 'linear-gradient(135deg,#F0954A,#DB6A2A)' }}
      >
        <Plus size={28} color="white" weight="bold" />
      </button>

      {/* Item Detail Sheet */}
      {selectedItem && (
        <ItemDetailSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={updates => updateItem(selectedItem.id, updates)}
          onDelete={id => { deleteItem(id); setSelectedItem(null) }}
        />
      )}

      {/* Add Sheet */}
      {showAdd && (
        <AddSheet
          category={category}
          onClose={() => setShowAdd(false)}
          onAdd={addItem}
        />
      )}
    </div>
  )
}
