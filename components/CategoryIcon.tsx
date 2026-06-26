'use client'

import { HeartStraight, ForkKnife, FilmSlate, Television, GameController } from '@phosphor-icons/react'
import { Category } from '@/lib/types'
import type { Icon } from '@phosphor-icons/react'

export function getCategoryIcon(category: Category): Icon {
  switch (category) {
    case 'dates': return HeartStraight
    case 'food': return ForkKnife
    case 'movies': return FilmSlate
    case 'shows': return Television
    case 'games': return GameController
  }
}
