export type Status = 'want' | 'done' | 'fav'
export type Category = 'dates' | 'food' | 'movies' | 'shows' | 'games'
export type Person = 'Baobao' | 'Michal'

export interface Item {
  id: string
  category: Category
  title: string
  note?: string
  location?: string
  addedBy: Person
  status: Status
  rating?: number
  review?: string
  addedAt: string
}
