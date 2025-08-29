"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";

// Simple Product type that matches your database
type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  stock?: number;
};

const categories = ["All", "Laptops", "Desktops", "Accessories"];

// Separate component that uses useSearchParams
function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Simple API call to get products
        const response = await fetch('http://localhost:4000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // If API fails, show empty state
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Simple filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = search === "" || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || 
      product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleWhatsAppClick = (product: Product) => {
    const message = `Hi! I'm interested in the ${product.name} (Rs. ${product.price.toLocaleString()}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/+923298135729?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openImageGallery = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeImageGallery = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            🚀 Our Products
          </h1>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          🚀 Our Products
        </h1>
        
        {/* Simple Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 md:px-6 py-2 md:py-3 rounded-full border-0 bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-sm md:text-base"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 px-4 md:px-6 py-2 md:py-3 rounded-full border-0 bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-sm md:text-base"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 text-lg">
              {search ? 'No products found matching your search.' : 'No products available yet.'}
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <div className="relative mb-4 group">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image.svg'}
                      alt={product.name}
                      className="w-full h-40 md:h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                      onClick={() => openImageGallery(product)}
                    />
                    <div 
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                      onClick={() => openImageGallery(product)}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm md:text-lg font-semibold text-center px-2">
                        📸 Click to view gallery
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                    {product.category}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{product.description}</p>
                <span className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rs. {product.price.toLocaleString()}
                </span>
                
                <div className="mt-auto space-y-2 md:space-y-3">
                  <Link 
                    href={`/products/${product.id}`} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleWhatsAppClick(product)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Ask on WhatsApp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Simple Image Gallery Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
          <div className="relative max-w-5xl w-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh]">
            <button
              onClick={closeImageGallery}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <img
                src={selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[currentImageIndex] : '/placeholder-image.svg'}
                alt={selectedProduct.name}
                className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] object-contain bg-gray-100"
              />
            </div>
            
            <div className="p-4 md:p-6 bg-white">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">{selectedProduct.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rs. {selectedProduct.price.toLocaleString()}
                </span>
                <button
                  onClick={() => handleWhatsAppClick(selectedProduct)}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg md:rounded-xl transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Ask on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            🚀 Our Products
          </h1>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
