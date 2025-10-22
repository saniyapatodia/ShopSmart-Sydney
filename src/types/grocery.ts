export interface GroceryItem {
  id: string
  name: string
  store: string
  price: number
  unitPrice: number
  unit: string
  location: string
  suburb: string
  lastUpdated: Date
  imageUrl?: string
  category?: string
  dietaryInfo?: string // e.g., "Gluten Free", "Vegan", "Organic"
  brand?: string // e.g., "Chobani", "Helga's"
  size?: string // e.g., "500g", "1L"
  description?: string
}

export interface SearchFilters {
  suburb?: string
  maxDistance?: number
  stores?: string[]
  sortBy?: 'price' | 'unitPrice' | 'lastUpdated' | 'distance'
  sortOrder?: 'asc' | 'desc'
}

export interface Store {
  id: string
  name: string
  suburb: string
  address: string
  latitude: number
  longitude: number
  postcode: string
}
