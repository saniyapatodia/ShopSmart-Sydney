import { GroceryItem, SearchFilters } from '@/types/grocery'

// FoodDataScrape API configuration
const FOOD_DATA_SCRAPE_API_KEY = process.env.NEXT_PUBLIC_FOOD_DATA_SCRAPE_API_KEY || 'your-api-key-here'
const FOOD_DATA_SCRAPE_BASE_URL = 'https://api.fooddatascrape.com'

// Real-time grocery data from FoodDataScrape
async function fetchRealTimeGroceryData(query: string, filters: SearchFilters): Promise<GroceryItem[]> {
  try {
    const response = await fetch(`${FOOD_DATA_SCRAPE_BASE_URL}/grocery/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FOOD_DATA_SCRAPE_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        stores: ['coles', 'woolworths', 'iga'],
        location: filters.suburb || 'Sydney',
        maxResults: 50,
        includePromotions: true,
        includeNutrition: true
      })
    })

    if (!response.ok) {
      throw new Error(`FoodDataScrape API error: ${response.status}`)
    }

    const data = await response.json()
    return transformFoodDataScrapeResponse(data)
  } catch (error) {
    console.error('Error fetching real-time grocery data:', error)
    // Fallback to mock data if API fails
    return getMockGroceryData(query, filters)
  }
}

// Transform FoodDataScrape API response to our GroceryItem format
function transformFoodDataScrapeResponse(apiData: any): GroceryItem[] {
  return apiData.products?.map((product: any, index: number) => ({
    id: product.id || `fds-${index}`,
    name: product.name || 'Unknown Product',
    store: mapStoreName(product.store),
    price: parseFloat(product.price) || 0,
    unitPrice: parseFloat(product.unitPrice) || 0,
    unit: product.unit || 'each',
    location: product.location || 'Sydney',
    suburb: product.suburb || 'Sydney CBD',
    lastUpdated: new Date(product.lastUpdated || new Date().toISOString()),
    imageUrl: product.imageUrl,
    category: product.category,
    dietaryInfo: product.dietaryInfo,
    brand: product.brand,
    size: product.size,
    description: product.description
  })) || []
}

// Map FoodDataScrape store names to our format
function mapStoreName(store: string): string {
  const storeMap: { [key: string]: string } = {
    'coles': 'Coles',
    'woolworths': 'Woolworths',
    'iga': 'IGA',
    'aldi': 'Aldi',
    'costco': 'Costco'
  }
  return storeMap[store.toLowerCase()] || store
}

// Enhanced mock data for demonstration - fallback when API is unavailable
const mockGroceryData: GroceryItem[] = [
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
    dietaryInfo: 'Gluten Free',
    brand: 'Helga\'s',
    size: '500g'
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
    dietaryInfo: 'Gluten Free',
    brand: 'Helga\'s',
    size: '500g'
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
    dietaryInfo: 'Gluten Free',
    brand: 'Schar',
    size: '400g'
  },

  // Yoghurt Options
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
    brand: 'Chobani',
    size: '907g'
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
    brand: 'Chobani',
    size: '907g'
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
    dietaryInfo: 'Organic',
    brand: 'Organic Valley',
    size: '1L'
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
    dietaryInfo: 'Vegan',
    brand: 'Violife',
    size: '200g'
  },

  // Basic items for comparison
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
    category: 'Dairy',
    brand: 'Dairy Farmers',
    size: '1L'
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
    category: 'Dairy',
    brand: 'Dairy Farmers',
    size: '1L'
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
    category: 'Bakery',
    brand: 'Wonder White',
    size: '700g'
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
    category: 'Pantry',
    brand: 'Sunrice',
    size: '1kg'
  }
]

// Fallback mock data function
function getMockGroceryData(query: string, filters: SearchFilters): GroceryItem[] {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([])
        return
      }
      
      const searchTerms = query.toLowerCase().split(' ')
      
      let results = mockGroceryData.filter(item => {
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
      
      resolve(results)
    }, 500)
  })
}

// Main search function - tries real API first, falls back to mock data
export async function searchGroceryItems(query: string, filters?: SearchFilters): Promise<GroceryItem[]> {
  // Try FoodDataScrape API first
  if (FOOD_DATA_SCRAPE_API_KEY && FOOD_DATA_SCRAPE_API_KEY !== 'your-api-key-here') {
    try {
      return await fetchRealTimeGroceryData(query, filters || {})
    } catch (error) {
      console.warn('FoodDataScrape API failed, using mock data:', error)
    }
  }
  
  // Fallback to mock data
  return getMockGroceryData(query, filters || {})
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

// FoodDataScrape specific functions
export async function fetchColesPrices(query: string, location?: string): Promise<GroceryItem[]> {
  try {
    const response = await fetch(`${FOOD_DATA_SCRAPE_BASE_URL}/coles/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FOOD_DATA_SCRAPE_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        location: location || 'Sydney',
        includePromotions: true
      })
    })

    if (!response.ok) {
      throw new Error(`Coles API error: ${response.status}`)
    }

    const data = await response.json()
    return transformFoodDataScrapeResponse(data)
  } catch (error) {
    console.error('Error fetching Coles prices:', error)
    return []
  }
}

export async function fetchWoolworthsPrices(query: string, location?: string): Promise<GroceryItem[]> {
  try {
    const response = await fetch(`${FOOD_DATA_SCRAPE_BASE_URL}/woolworths/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FOOD_DATA_SCRAPE_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        location: location || 'Sydney',
        includePromotions: true
      })
    })

    if (!response.ok) {
      throw new Error(`Woolworths API error: ${response.status}`)
    }

    const data = await response.json()
    return transformFoodDataScrapeResponse(data)
  } catch (error) {
    console.error('Error fetching Woolworths prices:', error)
    return []
  }
}

export async function fetchIGAPrices(query: string, location?: string): Promise<GroceryItem[]> {
  try {
    const response = await fetch(`${FOOD_DATA_SCRAPE_BASE_URL}/iga/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FOOD_DATA_SCRAPE_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        location: location || 'Sydney',
        includePromotions: true
      })
    })

    if (!response.ok) {
      throw new Error(`IGA API error: ${response.status}`)
    }

    const data = await response.json()
    return transformFoodDataScrapeResponse(data)
  } catch (error) {
    console.error('Error fetching IGA prices:', error)
    return []
  }
}