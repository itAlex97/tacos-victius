// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

const express = require('express');
const router = express.Router();
const {
    login,
    verifyToken,
    createAdmin
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Rutas públicas
router.post('/login', login);
router.post('/create-admin', createAdmin); // ⚠️ Remover en producción o proteger

// Rutas protegidas
router.get('/verify', protect, verifyToken);

module.exports = router;
