export enum Category {
  Laptops = 'Laptops',
  Desktops = 'Desktops',
  Accessories = 'Accessories'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  images: string[];
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
