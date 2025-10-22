import { GroceryItem, SearchFilters } from '@/types/grocery'

// Enhanced mock data with more specific products like gluten-free bread and Lidl yoghurt
const enhancedGroceryData: GroceryItem[] = [
  // Gluten Free Bread Options
  {
    id: 'gf-bread-1',
    name: 'Helga\'s Gluten Free Wholemeal Bread 500g',
    store: 'Woolworths',
    price: 6.50,
    unitPrice: 13.00,
    unit: 'per kg',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Bakery',
    dietaryInfo: 'Gluten Free'
  },
  {
    id: 'gf-bread-2',
    name: 'Helga\'s Gluten Free Wholemeal Bread 500g',
    store: 'Coles',
    price: 6.20,
    unitPrice: 12.40,
    unit: 'per kg',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Bakery',
    dietaryInfo: 'Gluten Free'
  },
  {
    id: 'gf-bread-3',
    name: 'Schar Gluten Free White Bread 400g',
    store: 'IGA',
    price: 7.80,
    unitPrice: 19.50,
    unit: 'per kg',
    location: '789 Oxford Street',
    suburb: 'Paddington',
    lastUpdated: new Date('2024-01-15T11:00:00Z'),
    category: 'Bakery',
    dietaryInfo: 'Gluten Free'
  },
  {
    id: 'gf-bread-4',
    name: 'Coles Gluten Free White Bread 500g',
    store: 'Coles',
    price: 5.50,
    unitPrice: 11.00,
    unit: 'per kg',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Bakery',
    dietaryInfo: 'Gluten Free'
  },

  // Lidl Yoghurt Options (Note: Lidl doesn't operate in Australia, but I'll add similar products)
  {
    id: 'yoghurt-1',
    name: 'Chobani Greek Yoghurt Natural 907g',
    store: 'Woolworths',
    price: 8.50,
    unitPrice: 9.37,
    unit: 'per kg',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Dairy',
    brand: 'Chobani'
  },
  {
    id: 'yoghurt-2',
    name: 'Chobani Greek Yoghurt Natural 907g',
    store: 'Coles',
    price: 8.20,
    unitPrice: 9.04,
    unit: 'per kg',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Dairy',
    brand: 'Chobani'
  },
  {
    id: 'yoghurt-3',
    name: 'Danone Activia Probiotic Yoghurt Natural 1kg',
    store: 'Woolworths',
    price: 6.50,
    unitPrice: 6.50,
    unit: 'per kg',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Dairy',
    brand: 'Danone'
  },
  {
    id: 'yoghurt-4',
    name: 'Danone Activia Probiotic Yoghurt Natural 1kg',
    store: 'Coles',
    price: 6.20,
    unitPrice: 6.20,
    unit: 'per kg',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Dairy',
    brand: 'Danone'
  },

  // More specific products
  {
    id: 'organic-milk-1',
    name: 'Organic Valley Organic Milk Full Cream 1L',
    store: 'Woolworths',
    price: 4.50,
    unitPrice: 4.50,
    unit: 'per litre',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Dairy',
    dietaryInfo: 'Organic'
  },
  {
    id: 'vegan-cheese-1',
    name: 'Violife Vegan Cheddar Style Slices 200g',
    store: 'Coles',
    price: 7.50,
    unitPrice: 37.50,
    unit: 'per kg',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Dairy',
    dietaryInfo: 'Vegan'
  },
  {
    id: 'keto-bread-1',
    name: 'Herman Brot Low Carb High Protein Bread 500g',
    store: 'IGA',
    price: 8.90,
    unitPrice: 17.80,
    unit: 'per kg',
    location: '789 Oxford Street',
    suburb: 'Paddington',
    lastUpdated: new Date('2024-01-15T11:00:00Z'),
    category: 'Bakery',
    dietaryInfo: 'Low Carb, High Protein'
  },

  // Original basic items for comparison
  {
    id: 'milk-1',
    name: 'Milk 1L',
    store: 'Woolworths',
    price: 2.50,
    unitPrice: 2.50,
    unit: 'per litre',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Dairy'
  },
  {
    id: 'milk-2',
    name: 'Milk 1L',
    store: 'Coles',
    price: 2.30,
    unitPrice: 2.30,
    unit: 'per litre',
    location: '456 Pitt Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T09:15:00Z'),
    category: 'Dairy'
  },
  {
    id: 'bread-1',
    name: 'Bread White Loaf',
    store: 'Woolworths',
    price: 3.50,
    unitPrice: 1.75,
    unit: 'per kg',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Bakery'
  },
  {
    id: 'rice-1',
    name: 'Rice 1kg',
    store: 'Woolworths',
    price: 4.50,
    unitPrice: 4.50,
    unit: 'per kg',
    location: '123 George Street',
    suburb: 'Sydney CBD',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
    category: 'Pantry'
  }
]

export async function searchGroceryItems(query: string, filters?: SearchFilters): Promise<GroceryItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (!query.trim()) {
    return []
  }
  
  const searchTerms = query.toLowerCase().split(' ')
  
  let results = enhancedGroceryData.filter(item => {
    const itemText = `${item.name} ${item.category} ${item.dietaryInfo || ''} ${item.brand || ''}`.toLowerCase()
    
    // Check if all search terms are found in the item
    return searchTerms.every(term => itemText.includes(term))
  })
  
  // Apply filters
  if (filters?.suburb) {
    results = results.filter(item => 
      item.suburb.toLowerCase().includes(filters.suburb!.toLowerCase())
    )
  }
  
  if (filters?.stores && filters.stores.length > 0) {
    results = results.filter(item => 
      filters.stores!.includes(item.store)
    )
  }
  
  // Apply sorting
  if (filters?.sortBy) {
    results.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'unitPrice':
          comparison = a.unitPrice - b.unitPrice
          break
        case 'lastUpdated':
          comparison = b.lastUpdated.getTime() - a.lastUpdated.getTime()
          break
        default:
          comparison = 0
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison
    })
  }
  
  return results
}

export async function getPopularItems(): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return [
    'Milk',
    'Bread',
    'Rice',
    'Bananas',
    'Eggs',
    'Chicken',
    'Potatoes',
    'Onions',
    'Tomatoes',
    'Cheese',
    'Gluten Free Bread',
    'Greek Yoghurt',
    'Organic Milk',
    'Vegan Cheese',
    'Low Carb Bread'
  ]
}

// Real API integration functions (for future implementation)
export async function fetchFromAusGroceryData(query: string): Promise<GroceryItem[]> {
  // TODO: Implement real API call to AusGroceryData
  // This would involve:
  // 1. Making HTTP requests to their API (when available)
  // 2. Parsing CSV data if using their download service
  // 3. Converting to our GroceryItem format
  
  console.log('Would fetch from AusGroceryData API:', query)
  return []
}

export async function fetchFromFoodDataScrape(query: string): Promise<GroceryItem[]> {
  // TODO: Implement web scraping service integration
  // This would involve:
  // 1. Setting up scraping service account
  // 2. Making requests to their API
  // 3. Handling rate limiting and data parsing
  
  console.log('Would fetch from FoodDataScrape service:', query)
  return []
}