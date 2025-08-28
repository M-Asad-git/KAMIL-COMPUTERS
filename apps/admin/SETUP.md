# Admin Frontend Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Backend API server running on port 4000
- MySQL database accessible by the backend

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment Variables
1. Copy the `env.template` file to `.env`:
```bash
cp env.template .env
```

2. Edit the `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Step 3: Ensure Backend is Running
**IMPORTANT**: Your backend API server must be running before starting the admin frontend!

1. Go to the `apps/apis` directory
2. Make sure you have a `.env` file with correct MySQL credentials
3. Start the backend server:
```bash
cd ../apis
npm run dev
```

4. Verify the backend is running:
   - Check console for "Server running on port 4000"
   - Test API endpoint: `http://localhost:4000/api/products`

## Step 4: Start Admin Frontend
```bash
# In a new terminal, from apps/admin directory
npm run dev
```

## Step 5: Verify Connection
- Admin app should start on `http://localhost:3000`
- Try to add a product - it should now work without database errors

## Troubleshooting Database Errors

### Error: "Database error" when adding products

**Most Common Causes:**

1. **Backend API Server Not Running**
   ```bash
   # Check if backend is running
   curl http://localhost:4000/api/products
   # Should return JSON response, not connection refused
   ```

2. **Backend Can't Connect to MySQL**
   - Check MySQL server is running
   - Verify credentials in `apps/apis/.env`
   - Ensure database exists: `kamil_computers`

3. **Wrong API URL**
   - Verify `NEXT_PUBLIC_API_URL` in admin `.env`
   - Should be: `http://localhost:4000/api`

4. **CORS Issues**
   - Backend CORS is configured for `http://localhost:3000`
   - Ensure admin runs on port 3000

### Quick Fix Checklist:
- [ ] Backend API server running on port 4000
- [ ] MySQL server running and accessible
- [ ] Database `kamil_computers` exists
- [ ] Correct MySQL credentials in `apps/apis/.env`
- [ ] Admin `.env` has correct `NEXT_PUBLIC_API_URL`
- [ ] Both servers running simultaneously

### Test API Connection:
```bash
# Test if backend is accessible
curl -X GET http://localhost:4000/api/products

# Test if you can create a product
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","category":"Laptops","description":"Test","price":999.99,"stock":1}'
```

## Development Workflow
1. Start MySQL server
2. Start backend API server (`apps/apis`)
3. Start admin frontend (`apps/admin`)
4. Both should now communicate properly
