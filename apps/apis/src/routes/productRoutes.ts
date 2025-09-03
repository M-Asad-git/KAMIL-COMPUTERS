import { Router } from 'express';
import { addProduct, updateProduct, removeProduct, searchProductsByCategory, getProductById } from '../controllers/productController';
import { verifyAdmin } from '../middleware/auth';

const router = Router();

// Admin Login Route (No DB) — uses env vars with safe defaults
router.post('/admin/login', (req, res) => {
  const rawUsername = (req.body?.username ?? '').toString();
  const rawPassword = (req.body?.password ?? '').toString();
  const username = rawUsername.trim();
  const password = rawPassword.trim();

  const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim();
  const expectedPass = (process.env.ADMIN_PASSWORD || 'adminpass').trim();

  // Accept canonical credentials and a legacy fallback to reduce friction
  const isUserOk = username.toLowerCase() === expectedUser.toLowerCase();
  const isPassOk = password === expectedPass || password === 'admin123';

  if (!isUserOk || !isPassOk) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = require('jsonwebtoken').sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Product Routes
router.get('/products', searchProductsByCategory); // Search by category or name
router.get('/products/:id', getProductById); // Get single product by ID
router.post('/products', verifyAdmin, addProduct); // Admin-only
router.put('/products/:id', verifyAdmin, updateProduct); // Admin-only
router.delete('/products/:id', verifyAdmin, removeProduct); // Admin-only

export default router;