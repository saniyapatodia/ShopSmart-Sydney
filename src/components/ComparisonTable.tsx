'use client'

import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, MapPin, Clock, Store } from 'lucide-react'
import { GroceryItem } from '@/types/grocery'
import { formatPrice, formatDate, cn } from '@/lib/utils'

interface ComparisonTableProps {
  items: GroceryItem[]
  isLoading?: boolean
  hasSearched?: boolean
}

type SortField = 'price' | 'unitPrice' | 'lastUpdated' | 'store'
type SortOrder = 'asc' | 'desc'

export function ComparisonTable({ items, isLoading = false, hasSearched = false }: ComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>('price')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    let comparison = 0
    
    switch (sortField) {
      case 'price':
        comparison = a.price - b.price
        break
      case 'unitPrice':
        comparison = a.unitPrice - b.unitPrice
        break
      case 'lastUpdated':
        comparison = b.lastUpdated.getTime() - a.lastUpdated.getTime()
        break
      case 'store':
        comparison = a.store.localeCompare(b.store)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortOrder === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-blue-600" /> : 
      <ArrowDown className="h-4 w-4 text-blue-600" />
  }

  const getStoreColor = (store: string) => {
    const colors = {
      'Woolworths': 'bg-red-100 text-red-800',
      'Coles': 'bg-blue-100 text-blue-800',
      'IGA': 'bg-green-100 text-green-800',
      'Aldi': 'bg-orange-100 text-orange-800',
      'Costco': 'bg-purple-100 text-purple-800'
    }
    return colors[store as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for the best prices...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0 && hasSearched) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <Store className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try searching for a different item or check your spelling.</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Item
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('store')}
              >
                <div className="flex items-center gap-2">
                  Store
                  {getSortIcon('store')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-2">
                  Price
                  {getSortIcon('price')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('unitPrice')}
              >
                <div className="flex items-center gap-2">
                  Unit Price
                  {getSortIcon('unitPrice')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Location
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center gap-2">
                  Last Updated
                  {getSortIcon('lastUpdated')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedItems.map((item, index) => (
              <tr 
                key={item.id} 
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  index === 0 && sortField === 'price' && "bg-green-50"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Store className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {item.category && <span>{item.category}</span>}
                        {item.dietaryInfo && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                            {item.dietaryInfo}
                          </span>
                        )}
                        {item.brand && <span className="text-blue-600">• {item.brand}</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStoreColor(item.store)
                  )}>
                    {item.store}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    {formatPrice(item.price)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {formatPrice(item.unitPrice)} / {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{item.suburb}</div>
                      <div className="text-xs text-gray-500">{item.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formatDate(item.lastUpdated)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedItems.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {sortedItems.length} result{sortedItems.length !== 1 ? 's' : ''}
            </div>
            {sortField === 'price' && (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Best price highlighted
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
