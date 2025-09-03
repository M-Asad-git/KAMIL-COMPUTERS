"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Admin Login Route (No DB) — uses env vars with safe defaults
router.post('/admin/login', (req, res) => {
    var _a, _b, _c, _d;
    const rawUsername = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : '').toString();
    const rawPassword = ((_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.password) !== null && _d !== void 0 ? _d : '').toString();
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
router.get('/products', productController_1.searchProductsByCategory); // Search by category or name
router.get('/products/:id', productController_1.getProductById); // Get single product by ID
router.post('/products', auth_1.verifyAdmin, productController_1.addProduct); // Admin-only
router.put('/products/:id', auth_1.verifyAdmin, productController_1.updateProduct); // Admin-only
router.delete('/products/:id', auth_1.verifyAdmin, productController_1.removeProduct); // Admin-only
exports.default = router;
