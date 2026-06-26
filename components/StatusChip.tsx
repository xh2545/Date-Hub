'use client'

import { Status } from '@/lib/types'

const STATUS_CONFIG: Record<Status, { label: string; bg: string; ink: string }> = {
  want: { label: 'Want', bg: '#FBE0C9', ink: '#DB6A2A' },
  done: { label: 'Done', bg: '#E7EFDD', ink: '#6E8A4A' },
  fav: { label: 'Loved', bg: '#FBD9D2', ink: '#D2562F' },
}

export function StatusChip({ status }: { status: Status }) {
  const c = STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[11px] font-semibold"
      style={{ background: c.bg, color: c.ink }}
    >
      {c.label}
    </span>
  )
}
