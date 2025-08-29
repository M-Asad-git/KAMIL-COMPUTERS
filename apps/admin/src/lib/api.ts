import { Product, LoginCredentials, LoginResponse, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add custom headers if provided
    if (options.headers) {
      if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else if (typeof options.headers === 'object') {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (value !== undefined) {
            headers[key] = value;
          }
        });
      }
    }

    if (this.getToken()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

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

  // Auth
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(response.token);
    return response;
  }

  // Products
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

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<{ id: string }>> {
    return this.request<ApiResponse<{ id: string }>>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
