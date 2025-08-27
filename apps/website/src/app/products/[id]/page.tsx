"use client";
import React, { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "UltraBook Pro 15",
    category: "Laptops",
    price: 360000,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ],
    description: "A powerful ultrabook with Intel i7, 16GB RAM, 512GB SSD, and a stunning 15-inch display. Perfect for professionals and students.",
    specs: [
      "Intel Core i7 12th Gen",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      '15.6" FHD IPS Display',
      "Windows 11 Pro"
    ]
  },
  {
    id: 2,
    name: "Gaming Beast X7",
    category: "Laptops",
    price: 525000,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ],
    description: "High-end gaming laptop with RTX 3070, 32GB RAM, and 1TB SSD. Built for the ultimate gaming experience.",
    specs: [
      "Intel Core i9 13th Gen",
      "32GB DDR5 RAM",
      "1TB NVMe SSD",
      '17.3" QHD 165Hz Display',
      "NVIDIA RTX 3070 8GB"
    ]
  },
  {
    id: 3,
    name: "Everyday Lite 13",
    category: "Laptops",
    price: 220000,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Lightweight and portable laptop for everyday tasks. Great battery life and affordable price.",
    specs: [
      "Intel Core i5 11th Gen",
      "8GB DDR4 RAM",
      "256GB SSD",
      '13.3" FHD Display',
      "Windows 11 Home"
    ]
  },
  {
    id: 4,
    name: "Pro Desktop Z5",
    category: "Desktops",
    price: 440000,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Professional desktop for creators and developers. Expandable and powerful.",
    specs: [
      "AMD Ryzen 9 5900X",
      "32GB DDR4 RAM",
      "1TB NVMe SSD + 2TB HDD",
      "NVIDIA RTX 3060 12GB",
      "Windows 11 Pro"
    ]
  },
  {
    id: 5,
    name: "Wireless Mouse X2",
    category: "Accessories",
    price: 13500,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Ergonomic wireless mouse with long battery life and precision tracking.",
    specs: [
      "2.4GHz Wireless",
      "1600 DPI Optical Sensor",
      "Rechargeable Battery",
      "6 Buttons",
      "Compatible with Windows/Mac"
    ]
  },
  {
    id: 6,
    name: "Mechanical Keyboard Pro",
    category: "Accessories",
    price: 35500,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ],
    description: "Premium mechanical keyboard with customizable RGB lighting and tactile switches.",
    specs: [
      "Cherry MX Blue Switches",
      "RGB Backlighting",
      "Aluminum Frame",
      "USB-C Connection",
      "Compatible with Windows/Mac/Linux"
    ]
  },
];

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [product] = useState(() => products.find((p) => p.id === Number(resolvedParams.id)));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) return notFound();

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the ${product.name} (Rs. ${product.price.toLocaleString()}). Can you provide more details about availability and warranty?`;
    const whatsappUrl = `https://wa.me/+923298135729?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative group">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={openImageModal}
                />
                
                {/* Click to view gallery overlay */}
                <div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center cursor-pointer rounded-xl"
                  onClick={openImageModal}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm md:text-lg font-semibold text-center px-2">
                    📸 Click to view gallery
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
                  {product.images.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                  {product.category}
                </div>
              </div>
              
              {/* Thumbnail images */}
              <div className="flex space-x-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-blue-500 scale-105' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={60}
                      className="w-16 h-12 md:w-20 md:h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Rs. {product.price.toLocaleString()}
                </div>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">🚀 Specifications</h2>
                <ul className="space-y-3">
                  {product.specs.map((spec: string, idx: number) => (
                    <li key={idx} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg text-sm md:text-base">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 md:py-4 px-6 rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Ask About This Product on WhatsApp
                </button>
                
                <Link
                  href="/products"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg md:rounded-xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                >
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
          <div className="relative max-w-5xl w-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh]">
            <button
              onClick={closeImageModal}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                width={800}
                height={600}
                className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] object-contain bg-gray-100"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
                {product.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-4 md:p-6 bg-white">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rs. {product.price.toLocaleString()}
                </span>
                <button
                  onClick={handleWhatsAppClick}
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