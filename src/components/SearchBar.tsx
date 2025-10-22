'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPopularItems } from '@/lib/grocery-api'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function SearchBar({ onSearch, isLoading = false, placeholder = "Search for groceries..." }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [popularItems, setPopularItems] = useState<string[]>([])

  useEffect(() => {
    // Load popular items on component mount
    getPopularItems().then(setPopularItems)
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      // Filter popular items based on query
      const filtered = popularItems.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query, popularItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery('')
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className={cn(
              "w-full pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-200 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400",
              "bg-white transition-all duration-200",
              "text-black placeholder-gray-500"
            )}
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={cn(
            "w-full py-3 sm:py-4 bg-orange-500 text-white rounded-lg text-sm sm:text-base font-medium",
            "hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed",
            "transition-colors duration-200"
          )}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3 w-3 text-orange-500" />
                <span className="text-black">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Popular items when no query */}
      {!query && popularItems.length > 0 && (
        <div className="mt-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularItems.slice(0, 6).map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs sm:text-sm transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
