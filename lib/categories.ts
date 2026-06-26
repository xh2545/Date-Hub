import { Category } from './types'

interface CategoryConfig {
  label: string
  route: string
  accent: string
  tint: string
  wantLabel: string
  doneLabel: string
  locationLabel: string
  reviewPrompt: string
  countLabel: (total: number, done: number) => string
  latestPrefix?: string
}

export const categories: Record<Category, CategoryConfig> = {
  dates: {
    label: 'Date Ideas',
    route: '/dates',
    accent: '#DB6A2A',
    tint: '#FBE0C9',
    wantLabel: 'Want to try',
    doneLabel: 'Done',
    locationLabel: 'Location',
    reviewPrompt: 'How was your date?',
    countLabel: (total, done) => `${total} ideas · ${done} done together`,
    latestPrefix: 'Latest:',
  },
  food: {
    label: 'Restaurants',
    route: '/restaurants',
    accent: '#D2562F',
    tint: '#FCDFD2',
    wantLabel: 'Want to try',
    doneLabel: 'Been',
    locationLabel: 'Location',
    reviewPrompt: 'How was the meal?',
    countLabel: (total, done) => `${total} spots · ${done} been together`,
  },
  movies: {
    label: 'Movies',
    route: '/movies',
    accent: '#C79320',
    tint: '#FBEBC8',
    wantLabel: 'Want to watch',
    doneLabel: 'Watched',
    locationLabel: 'Where to watch',
    reviewPrompt: 'How was it?',
    countLabel: (total, done) => `${total} movies · ${done} watched together`,
  },
  shows: {
    label: 'Shows',
    route: '/shows',
    accent: '#A99019',
    tint: '#F4EDC4',
    wantLabel: 'Want to watch',
    doneLabel: 'Watched',
    locationLabel: 'Where to watch',
    reviewPrompt: 'How was it?',
    countLabel: (total, done) => `${total} shows · ${done} watched together`,
  },
  games: {
    label: 'Games',
    route: '/games',
    accent: '#D85A28',
    tint: '#FBDDC8',
    wantLabel: 'Want to play',
    doneLabel: 'Played',
    locationLabel: 'Platform',
    reviewPrompt: 'How was it?',
    countLabel: (total, done) => `${total} games · ${done} played together`,
  },
}
