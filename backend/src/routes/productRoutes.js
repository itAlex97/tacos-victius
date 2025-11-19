// ==========================================
// RUTAS DE PRODUCTOS
// ==========================================

const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAvailableProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Rutas públicas
router.get('/', getAllProducts);
router.get('/available', getAvailableProducts);
router.get('/:id', getProductById);

// Rutas protegidas (requieren autenticación)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
