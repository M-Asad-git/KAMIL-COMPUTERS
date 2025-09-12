export type Category = 'Laptops' | 'Desktops' | 'Accessories';

export interface Product {
  name: string;
  category: Category; // Using Category enum for PostgreSQL
  description: string;
  price: number;
  images?: string[]; // Keep as array in interface, we'll serialize in controller
  stock?: number;
}

// Extend Express Request to include user from JWT
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}