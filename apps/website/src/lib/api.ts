import { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class WebsiteApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all products
  async getProducts(params?: {
    category?: string;
    name?: string;
    limit?: number;
    skip?: number;
  }): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.name) searchParams.append('name', params.name);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.skip) searchParams.append('skip', params.skip.toString());

    const queryString = searchParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Product[]>(endpoint);
  }

  // Get product by ID
  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.request<Product[]>(`/products?category=${category}`);
  }

  // Search products with intelligent backend search
  async searchProducts(query: string): Promise<Product[]> {
    // Use the backend's intelligent search functionality
    return this.request<Product[]>(`/products?name=${encodeURIComponent(query)}`);
  }
}

export const websiteApiClient = new WebsiteApiClient();
