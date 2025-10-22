'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FilterPanel } from '@/components/FilterPanel'
import { GroceryItem, SearchFilters } from '@/types/grocery'
import { searchGroceryItems } from '@/lib/grocery-api'
import { DollarSign, TrendingDown, MapPin, Sparkles, Zap } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<GroceryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)
    
    try {
      const data = await searchGroceryItems(query, filters)
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFiltersChange = async (newFilters: SearchFilters) => {
    setFilters(newFilters)
    
    if (searchQuery) {
      setIsLoading(true)
      try {
        const data = await searchGroceryItems(searchQuery, newFilters)
        setResults(data)
      } catch (error) {
        console.error('Filter error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Extract unique suburbs and stores from results for filter options
  const availableSuburbs = Array.from(new Set(results.map(item => item.suburb))).sort()
  const availableStores = Array.from(new Set(results.map(item => item.store))).sort()

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-6"></div>
            <DollarSign className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-orange-500 animate-pulse" />
          </div>
          <p className="text-black font-semibold text-lg">Loading ShopSmart Sydney...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div className="text-2xl sm:text-3xl drop-shadow-xl filter brightness-110 font-bold">🛒</div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-black">
                  <span className="text-orange-500">ShopSmart</span> Sydney
                </h1>
              </div>
            </div>
            
            {results.length > 0 && (
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                availableSuburbs={availableSuburbs}
                availableStores={availableStores}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8">
        {/* Hero Section */}
        {results.length === 0 && !isLoading && searchQuery.trim() === '' && (
          <div className="text-center py-8 sm:py-16">
            {/* Fresh Produce Photo */}
            <div className="mb-6 sm:mb-8">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-lg mx-auto relative">
                <img 
                  src="https://images.unsplash.com/photo-1659283506371-d5c45ab0f4c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=100&w=800&h=800" 
                  alt="Fresh produce display in supermarket"
                  className="w-full h-full object-cover"
                />
                
                {/* Animated stars around the circle */}
                <div className="absolute -top-4 -left-4 w-4 h-4 text-yellow-400 animate-pulse">
                  <div className="text-2xl">⭐</div>
                </div>
                <div className="absolute -top-6 -right-6 w-3 h-3 text-green-400 animate-bounce">
                  <div className="text-xl">✨</div>
                </div>
                <div className="absolute -bottom-4 -left-6 w-3 h-3 text-yellow-400 animate-pulse">
                  <div className="text-xl">⭐</div>
                </div>
                <div className="absolute -bottom-6 -right-4 w-4 h-4 text-green-400 animate-bounce">
                  <div className="text-2xl">✨</div>
                </div>
                <div className="absolute top-8 -left-8 w-2 h-2 text-yellow-400 animate-pulse">
                  <div className="text-lg">⭐</div>
                </div>
                <div className="absolute top-12 -right-8 w-2 h-2 text-green-400 animate-bounce">
                  <div className="text-lg">✨</div>
                </div>
                <div className="absolute bottom-8 -left-8 w-2 h-2 text-green-400 animate-pulse">
                  <div className="text-lg">✨</div>
                </div>
                <div className="absolute bottom-12 -right-8 w-2 h-2 text-yellow-400 animate-bounce">
                  <div className="text-lg">⭐</div>
                </div>
              </div>
            </div>
            
            {/* Title with Trolley */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="text-3xl sm:text-4xl drop-shadow-xl filter brightness-110 font-bold">🛒</div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-black">
                <span className="text-orange-500">ShopSmart</span> Sydney
              </h2>
            </div>
            
            {/* One-line description */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto px-4">
              Find the best grocery deals across Sydney stores - save your dosh, mate!
            </p>

            {/* Search Bar */}
            <div className="mb-6 sm:mb-8 px-4">
              <SearchBar
                onSearch={handleSearch}
                isLoading={isLoading}
                placeholder="Search for groceries (e.g., milk, bread, rice)..."
              />
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-black">
                Price Comparison Results
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setResults([])
                    setFilters({})
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Search for More
                </button>
              </div>
            </div>
          </div>
        )}

        <ComparisonTable items={results} isLoading={isLoading} hasSearched={searchQuery.trim() !== ''} />

        {/* Footer Info */}
        {results.length > 0 && (
          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-6 w-6 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-black mb-2">Best Prices</h4>
                <p className="text-sm text-gray-600">Find the lowest prices across all major Sydney stores</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-black mb-2">Sydney Coverage</h4>
                <p className="text-sm text-gray-600">Compare prices from stores across all Sydney suburbs</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-black mb-2">All Major Stores</h4>
                <p className="text-sm text-gray-600">Woolworths, Coles, IGA, Aldi, and more</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
