"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product showcase images for carousel
  const productImages = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your computer products. Can you help me?";
    const whatsappUrl = `https://wa.me/+923298135729?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 text-gray-900">
      {/* Hero Section with Animated Product Showcase */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-purple-400/25 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-in-up">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-200 animate-fade-in-left">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 animate-spin-slow">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    🚀 PREMIUM COMPUTER SOLUTIONS
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fade-in-up">
                  Your Trusted Partner for
                  <span className="text-yellow-300 block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent animate-pulse">
                    Computer Excellence
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-blue-100 max-w-lg mx-auto lg:mx-0 animate-fade-in-up delay-200">
                  Discover premium laptops, desktops, and professional services. 
                  <span className="text-yellow-200 font-semibold">Quality products backed by expert support.</span>
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-md mx-auto lg:mx-0 animate-fade-in-up delay-300">
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="🔍 What are you looking for today?"
                    className="w-full px-4 md:px-6 py-3 md:py-4 pr-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 text-sm md:text-base transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 bg-yellow-400 hover:bg-yellow-300 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base relative overflow-hidden group"
                >
                  <span className="relative z-10">View Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base relative overflow-hidden group"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="relative z-10">WhatsApp Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Right Content - Animated Product Showcase */}
            <div className="relative order-first lg:order-last animate-fade-in-right">
              <div className="relative z-10 group">
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Product ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  ))}
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                          index === currentImageIndex ? 'bg-yellow-400 shadow-lg' : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Enhanced Pricing Card */}
                <div className="hidden md:block absolute -bottom-4 -right-4 bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-2xl max-w-[120px] md:max-w-none transform transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-bounce-slow">
                  <div className="text-center">
                    <div className="text-sm md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      From
                    </div>
                    <div className="text-lg md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Rs.20,000
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Starting Price</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Background Elements */}
              <div className="absolute top-10 -right-10 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-10 -left-10 w-12 h-12 md:w-16 md:h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 -left-5 w-8 h-8 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute top-1/4 -right-5 w-6 h-6 bg-green-400 rounded-full opacity-25 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            ✨ Why Choose Kamil Computers?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm md:text-base">All products come with manufacturer warranty and our quality assurance.</p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">Expert Support</h3>
              <p className="text-gray-600 text-sm md:text-base">Professional technicians and 24/7 customer support available via WhatsApp.</p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">Easy Communication</h3>
              <p className="text-gray-600 text-sm md:text-base">Contact us directly via WhatsApp for quick responses and personalized service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
