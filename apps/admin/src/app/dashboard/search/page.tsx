'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/api';
import { Product, Category } from '@/types';
import { Search, Filter, Package, DollarSign, AlertTriangle } from 'lucide-react';

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock' | 'outOfStock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'created_at'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (searchTerm || selectedCategory) {
      performSearch();
    }
  }, [performSearch]);

  const performSearch = useCallback(async () => {
    if (!searchTerm && !selectedCategory) return;

    setIsLoading(true);
    try {
      const params: {
        limit: number;
        skip: number;
        name?: string;
        category?: Category;
      } = {
        limit: 100,
        skip: 0,
      };
      
      if (searchTerm) params.name = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      
      let data = await apiClient.getProducts(params);
      
      // Apply client-side filters
      data = data.filter(product => {
        // Price range filter
        if (priceRange.min && product.price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && product.price > parseFloat(priceRange.max)) return false;
        
        // Stock filter
        const stock = product.stock || 0;
        switch (stockFilter) {
          case 'inStock':
            return stock > 10;
          case 'lowStock':
            return stock > 0 && stock <= 10;
          case 'outOfStock':
            return stock === 0;
          default:
            return true;
        }
      });

      // Apply sorting
      data.sort((a, b) => {
        let aValue: string | number | Date;
        let bValue: string | number | Date;
        
        switch (sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'stock':
            aValue = a.stock || 0;
            bValue = b.stock || 0;
            break;
          case 'created_at':
            aValue = new Date(a.created_at);
            bValue = new Date(b.created_at);
            break;
          default:
            return 0;
        }

        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      setProducts(data);
    } catch (error) {
      console.error('Search failed:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, priceRange, stockFilter, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setStockFilter('all');
    setSortBy('name');
    setSortOrder('asc');
    setProducts([]);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
            <p className="text-gray-600">Search and filter products with advanced criteria</p>
          </div>

          {/* Search Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by product name..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | '')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Desktops">Desktops</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label htmlFor="stockFilter" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Status
                </label>
                <select
                  id="stockFilter"
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as 'all' | 'inStock' | 'lowStock' | 'outOfStock')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="all">All Stock Levels</option>
                  <option value="inStock">In Stock (&gt;10)</option>
                  <option value="lowStock">Low Stock (1-10)</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'stock' | 'created_at')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="stock">Stock</option>
                  <option value="created_at">Date Created</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="minPrice"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="maxPrice"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="1000.00"
                    min="0"
                    step="0.01"
                    className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-end space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Search Results
                </h3>
                                  <span className="text-sm text-gray-500">
                    {products.length} product{products.length !== 1 ? "s" : ""} found
                  </span>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => {
                    const stockStatus = getStockStatus(product.stock || 0);
                    return (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                            {stockStatus.label}
                          </span>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Package className="h-4 w-4 mr-1" />
                              {product.category}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {product.price}
                            </span>
                            <span className="flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              {product.stock || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
