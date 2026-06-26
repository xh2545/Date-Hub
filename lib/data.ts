'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { Item } from './types'

const SEED_DATA: Item[] = [
  { id: 'd1', category: 'dates', title: 'Pottery class downtown', addedBy: 'Baobao', status: 'want', location: 'Clay Studio, Arts District', note: 'Saturday 2pm slot. Matching mugs, obviously.', addedAt: '2024-01-15T10:00:00Z' },
  { id: 'd2', category: 'dates', title: 'Stargazing drive up north', addedBy: 'Michal', status: 'want', location: 'Ridgeline Overlook', note: 'Bring blankets and the aux cord.', addedAt: '2024-01-20T10:00:00Z' },
  { id: 'd3', category: 'dates', title: 'Sunset picnic at the bluffs', addedBy: 'Baobao', status: 'done', rating: 5, review: 'Golden hour, cheese board, no phones. Perfect.', location: 'Mori Point', addedAt: '2024-02-01T10:00:00Z' },
  { id: 'd4', category: 'dates', title: 'Escape room challenge', addedBy: 'Michal', status: 'done', rating: 4, location: 'Puzzle HQ Downtown', addedAt: '2024-02-10T10:00:00Z' },
  { id: 'd5', category: 'dates', title: 'Comedy show night', addedBy: 'Baobao', status: 'fav', rating: 5, review: 'We laughed until we cried. Doing this every month.', location: 'Punch Line SF', addedAt: '2024-02-14T10:00:00Z' },
  { id: 'd6', category: 'dates', title: 'Drive-in movie date', addedBy: 'Michal', status: 'want', location: 'West Wind Drive-In', note: "Find one that's still open!", addedAt: '2024-02-20T10:00:00Z' },
  { id: 'f1', category: 'food', title: 'Tartine bakery run', addedBy: 'Baobao', status: 'want', location: 'Mission District', note: 'Morning pastries before they sell out.', addedAt: '2024-01-10T10:00:00Z' },
  { id: 'f2', category: 'food', title: 'Kumo ramen', addedBy: 'Michal', status: 'want', location: 'Japantown', note: 'The spicy miso is supposedly life-changing.', addedAt: '2024-01-18T10:00:00Z' },
  { id: 'f3', category: 'food', title: "Brunch at Lila's", addedBy: 'Baobao', status: 'done', rating: 5, review: 'Best eggs benny in the city.', location: 'Hayes Valley', addedAt: '2024-02-05T10:00:00Z' },
  { id: 'f4', category: 'food', title: 'Tacos at El Vecino', addedBy: 'Michal', status: 'done', rating: 4, location: 'The Mission', addedAt: '2024-02-12T10:00:00Z' },
  { id: 'f5', category: 'food', title: 'Omakase at Hana', addedBy: 'Baobao', status: 'fav', rating: 5, review: 'Worth every penny. Do this for our anniversary.', location: 'Japantown', addedAt: '2024-02-18T10:00:00Z' },
  { id: 'f6', category: 'food', title: 'Dumpling crawl', addedBy: 'Michal', status: 'want', location: 'Richmond District', note: '3 restaurants, one afternoon.', addedAt: '2024-02-25T10:00:00Z' },
  { id: 'm1', category: 'movies', title: 'Past Lives', addedBy: 'Baobao', status: 'want', location: 'Rent', note: 'Cry-together energy. Tissues on standby.', addedAt: '2024-01-12T10:00:00Z' },
  { id: 'm2', category: 'movies', title: 'Dune: Part Two', addedBy: 'Michal', status: 'want', location: 'Max', note: 'We missed it in theaters.', addedAt: '2024-01-22T10:00:00Z' },
  { id: 'm3', category: 'movies', title: 'Sinners', addedBy: 'Michal', status: 'want', location: 'Max', addedAt: '2024-02-02T10:00:00Z' },
  { id: 'm4', category: 'movies', title: 'The Grand Budapest Hotel', addedBy: 'Michal', status: 'fav', rating: 5, review: 'Wes Anderson perfection. Watch with wine.', location: 'Netflix', addedAt: '2024-02-08T10:00:00Z' },
  { id: 'm5', category: 'movies', title: 'Aftersun', addedBy: 'Baobao', status: 'done', rating: 4, location: 'MUBI', addedAt: '2024-02-15T10:00:00Z' },
  { id: 'm6', category: 'movies', title: 'Tár', addedBy: 'Michal', status: 'done', rating: 5, review: 'Challenging and beautiful.', location: 'Peacock', addedAt: '2024-02-22T10:00:00Z' },
  { id: 's1', category: 'shows', title: 'The Bear, Season 3', addedBy: 'Michal', status: 'want', location: 'Hulu', note: "Don't spoil it.", addedAt: '2024-01-25T10:00:00Z' },
  { id: 's2', category: 'shows', title: 'Severance', addedBy: 'Baobao', status: 'want', location: 'Apple TV+', addedAt: '2024-02-03T10:00:00Z' },
  { id: 's3', category: 'shows', title: 'The Diplomat', addedBy: 'Baobao', status: 'done', rating: 4, location: 'Netflix', addedAt: '2024-02-11T10:00:00Z' },
  { id: 's4', category: 'shows', title: 'Slow Horses', addedBy: 'Michal', status: 'fav', rating: 5, review: 'Best spy show going.', location: 'Apple TV+', addedAt: '2024-02-19T10:00:00Z' },
  { id: 'g1', category: 'games', title: 'Mario Kart tournament', addedBy: 'Baobao', status: 'want', location: 'Nintendo Switch', note: 'Loser does dishes.', addedAt: '2024-01-28T10:00:00Z' },
  { id: 'g2', category: 'games', title: 'Stardew Valley co-op', addedBy: 'Michal', status: 'want', location: 'PC', note: 'Our farm is waiting.', addedAt: '2024-02-06T10:00:00Z' },
  { id: 'g3', category: 'games', title: 'Catan championship', addedBy: 'Baobao', status: 'done', rating: 4, location: 'Board game', note: "Michal won but we don't talk about it.", addedAt: '2024-02-16T10:00:00Z' },
]

// Map DB row (snake_case) → Item (camelCase)
function fromRow(row: Record<string, unknown>): Item {
  return {
    id: row.id as string,
    category: row.category as Item['category'],
    title: row.title as string,
    note: row.note as string | undefined,
    location: row.location as string | undefined,
    addedBy: row.added_by as Item['addedBy'],
    status: row.status as Item['status'],
    rating: row.rating as number | undefined,
    review: row.review as string | undefined,
    addedAt: row.added_at as string,
  }
}

// Map Item (camelCase) → DB row (snake_case)
function toRow(item: Item) {
  return {
    id: item.id,
    category: item.category,
    title: item.title,
    note: item.note ?? null,
    location: item.location ?? null,
    added_by: item.addedBy,
    status: item.status,
    rating: item.rating ?? null,
    review: item.review ?? null,
    added_at: item.addedAt,
  }
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  // Initial load + seed if empty
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('items').select('*').order('added_at', { ascending: true })
      if (error) { console.error(error); setLoading(false); return }

      if (data && data.length === 0) {
        // Seed the database on first load
        const { error: seedError } = await supabase.from('items').insert(SEED_DATA.map(toRow))
        if (seedError) console.error('Seed error:', seedError)
        setItems(SEED_DATA)
      } else if (data) {
        setItems(data.map(fromRow))
      }
      setLoading(false)
    }
    load()
  }, [])

  // Real-time subscription — keeps both phones in sync
  useEffect(() => {
    const channel = supabase
      .channel('items-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'items' }, () => {
        // Re-fetch on any change
        supabase.from('items').select('*').order('added_at', { ascending: true }).then(({ data }) => {
          if (data) setItems(data.map(fromRow))
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addItem = async (item: Item) => {
    const { error } = await supabase.from('items').insert(toRow(item))
    if (error) console.error(error)
  }

  const updateItem = async (id: string, updates: Partial<Item>) => {
    const row: Record<string, unknown> = {}
    if (updates.status !== undefined) row.status = updates.status
    if (updates.rating !== undefined) row.rating = updates.rating ?? null
    if (updates.review !== undefined) row.review = updates.review ?? null
    const { error } = await supabase.from('items').update(row).eq('id', id)
    if (error) console.error(error)
  }

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from('items').delete().eq('id', id)
    if (error) console.error(error)
  }

  return { items, loading, addItem, updateItem, deleteItem }
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning,'
  if (hour >= 12 && hour < 17) return 'Good afternoon,'
  if (hour >= 17 && hour < 21) return 'Good evening,'
  return 'Good night,'
}
