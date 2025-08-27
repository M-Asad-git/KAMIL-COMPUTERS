# Kamil Computers Admin Panel

A modern, responsive admin interface built with Next.js 15, TypeScript, and Tailwind CSS for managing Kamil Computers product inventory.

## Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure admin login system
- **Protected Routes** - All dashboard pages require authentication
- **Token Management** - Automatic token storage and validation

### 📊 Dashboard Overview
- **Statistics Dashboard** - Product counts, total value, stock levels
- **Category Breakdown** - Visual representation of products by category
- **Recent Products** - Latest additions to inventory
- **Low Stock Alerts** - Highlight products with low inventory

### 🛍️ Product Management
- **Product List** - Comprehensive table view with search and filtering
- **Add Products** - Form-based product creation with image support
- **Edit Products** - Update existing product information
- **Delete Products** - Remove products with confirmation
- **Stock Management** - Track inventory levels

### 🔍 Advanced Search & Filtering
- **Text Search** - Search by product name
- **Category Filtering** - Filter by Laptops, Desktops, or Accessories
- **Price Range** - Set minimum and maximum price filters
- **Stock Status** - Filter by stock levels (In Stock, Low Stock, Out of Stock)
- **Sorting Options** - Sort by name, price, stock, or creation date
- **Real-time Results** - Instant search results with debouncing

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Clean, professional appearance
- **Interactive Elements** - Hover effects, loading states, and animations
- **Accessibility** - Proper ARIA labels and keyboard navigation

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API
- **Authentication**: JWT tokens with localStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (see `apps/apis`)

### Installation

1. **Navigate to the admin directory:**
   ```bash
   cd apps/admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the admin directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   JWT_SECRET=your-secret-key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials
- **Username**: `admin`
- **Password**: `adminpass`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── products/      # Product management
│   │   ├── search/        # Advanced search
│   │   └── settings/      # Admin settings
│   ├── login/             # Authentication page
│   └── layout.tsx         # Root layout with AuthProvider
├── components/            # Reusable UI components
│   ├── DashboardLayout.tsx    # Main dashboard layout
│   └── ProtectedRoute.tsx     # Authentication wrapper
├── contexts/              # React Context providers
│   └── AuthContext.tsx    # Authentication state management
├── lib/                   # Utility libraries
│   └── api.ts            # API client and HTTP utilities
└── types/                 # TypeScript type definitions
    └── index.ts          # Shared types and interfaces
```

## API Integration

The admin panel communicates with the backend API (`apps/apis`) through:

- **Product CRUD Operations** - Create, read, update, delete products
- **Search & Filtering** - Advanced product search with multiple criteria
- **Authentication** - Login/logout with JWT token management

### API Endpoints Used
- `POST /api/admin/login` - Admin authentication
- `GET /api/products` - Retrieve products with filters
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Remove product

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript** - Strict type checking enabled
- **ESLint** - Code quality and consistency
- **Prettier** - Automatic code formatting
- **Tailwind CSS** - Utility-first CSS framework

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure these are set in your production environment:
- `NEXT_PUBLIC_API_URL` - Your production API endpoint
- `JWT_SECRET` - Secure JWT secret key

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Ensure responsive design for mobile devices
4. Add proper error handling and loading states
5. Test authentication flows thoroughly

## Troubleshooting

### Common Issues

**Authentication Errors**
- Verify JWT_SECRET matches backend configuration
- Check API endpoint is accessible
- Clear browser localStorage if tokens are corrupted

**API Connection Issues**
- Ensure backend server is running
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS configuration on backend

**Build Errors**
- Clear `.next` directory and node_modules
- Verify TypeScript compilation
- Check for missing dependencies

## License

This project is part of the Kamil Computers ecosystem and follows the same licensing terms.
