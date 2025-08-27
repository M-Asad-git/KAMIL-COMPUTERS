export type Category = 'Laptops' | 'Desktops' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  images?: string[];
  stock?: number;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
