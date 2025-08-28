# Website Setup Guide - Dynamic Products from Database

## Overview
Your website now fetches products dynamically from the backend API instead of using static hardcoded data. This means:
- **Admin Panel**: Add/edit/delete products → saves to MySQL database
- **Website**: Displays products from the same database in real-time
- **Real-time Updates**: Products added in admin appear immediately on website

## Prerequisites
- Backend API server running on port 4000
- MySQL database with products table
- Admin panel working and able to add products

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment Variables
1. Copy the `env.template` file to `.env`:
```bash
cp env.template .env
```

2. The `.env` file should contain:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3001
```

## Step 3: Start the Website
```bash
npm run dev
```

**Important**: The website runs on port 3001 to avoid conflicts with the admin panel (port 3000).

## Step 4: Verify Dynamic Products
1. **Add a product from admin panel** (`http://localhost:3000`)
2. **Check website** (`http://localhost:3001/products`) - the product should appear
3. **Real-time updates** - no need to restart anything

## How It Works

### Data Flow:
```
Admin Panel (Port 3000)
    ↓ (Adds product to database)
MySQL Database
    ↓ (API fetches data)
Backend API (Port 4000)
    ↓ (Website requests data)
Website (Port 3001)
    ↓ (Displays products)
User sees dynamic products
```

### Key Features:
- **Real-time Product Display**: Products added in admin appear on website instantly
- **Dynamic Categories**: Filter by Laptops, Desktops, Accessories
- **Search Functionality**: Search products by name or description
- **Stock Information**: Shows available stock for each product
- **Responsive Design**: Works on all devices

## Troubleshooting

### Issue: Website shows "No products available yet"
**Solution**: 
1. Ensure backend API is running (`http://localhost:4000`)
2. Check if products exist in database
3. Verify API endpoint `/api/products` returns data

### Issue: Products not updating on website
**Solution**:
1. Refresh the website page
2. Check browser console for API errors
3. Verify backend is connected to MySQL

### Issue: Images not displaying
**Solution**:
1. Ensure image URLs in admin are valid
2. Check if images are accessible from website
3. Fallback placeholder images will show if needed

## Development Workflow

### 1. Start All Services:
```bash
# Terminal 1: Backend API
cd apps/apis
npm run dev

# Terminal 2: Admin Panel
cd apps/admin
npm run dev

# Terminal 3: Website
cd apps/website
npm run dev
```

### 2. Test the Flow:
1. **Add product** in admin panel
2. **Check website** - product should appear
3. **Edit product** in admin - changes reflect on website
4. **Delete product** in admin - removed from website

### 3. Monitor Logs:
- Backend: Check for database connection and API requests
- Admin: Check for successful product creation
- Website: Check for successful API calls

## API Endpoints Used by Website

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/products?category=Laptops` - Filter by category
- `GET /api/products?name=search` - Search products

## Benefits of This Setup

✅ **Real-time Updates**: No manual content updates needed
✅ **Centralized Management**: All products managed from admin panel
✅ **Consistent Data**: Same product info across admin and website
✅ **Scalable**: Easy to add more products and features
✅ **Professional**: Dynamic content like modern e-commerce sites

## Next Steps

Once this is working, you can enhance:
- **Product Reviews**: Add customer reviews system
- **Inventory Management**: Track stock levels automatically
- **Order System**: Allow customers to place orders
- **Analytics**: Track product views and performance
- **SEO**: Dynamic meta tags for each product

Your website is now a dynamic, professional e-commerce platform! 🚀
