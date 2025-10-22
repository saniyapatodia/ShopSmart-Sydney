'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { SearchFilters } from '@/types/grocery'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  availableSuburbs: string[]
  availableStores: string[]
}

export function FilterPanel({ filters, onFiltersChange, availableSuburbs, availableStores }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSuburbChange = (suburb: string) => {
    onFiltersChange({
      ...filters,
      suburb: suburb || undefined
    })
  }

  const handleStoreToggle = (store: string) => {
    const currentStores = filters.stores || []
    const newStores = currentStores.includes(store)
      ? currentStores.filter(s => s !== store)
      : [...currentStores, store]
    
    onFiltersChange({
      ...filters,
      stores: newStores.length > 0 ? newStores : undefined
    })
  }

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = filters.suburb || filters.stores?.length || filters.sortBy

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors",
          hasActiveFilters 
            ? "bg-blue-50 border-blue-200 text-blue-700" 
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
            {[filters.suburb, filters.stores?.length, filters.sortBy].filter(Boolean).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Filter Results</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Suburb Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suburb
              </label>
              <select
                value={filters.suburb || ''}
                onChange={(e) => handleSuburbChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All suburbs</option>
                {availableSuburbs.map(suburb => (
                  <option key={suburb} value={suburb}>{suburb}</option>
                ))}
              </select>
            </div>

            {/* Store Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stores
              </label>
              <div className="space-y-2">
                {availableStores.map(store => (
                  <label key={store} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.stores?.includes(store) || false}
                      onChange={() => handleStoreToggle(store)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{store}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <div className="space-y-2">
                {[
                  { value: 'price', label: 'Price (Low to High)' },
                  { value: 'unitPrice', label: 'Unit Price (Low to High)' },
                  { value: 'lastUpdated', label: 'Most Recent' },
                  { value: 'distance', label: 'Distance (if location provided)' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={() => handleSortChange(option.value as SearchFilters['sortBy'])}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
