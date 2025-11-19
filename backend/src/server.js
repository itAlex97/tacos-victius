// ==========================================
// SERVIDOR PRINCIPAL - EXPRESS + MONGODB
// ==========================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

// Inicializar Express
const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors()); // Permitir CORS
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear URL-encoded

// Rutas de la API (antes de static para tener prioridad)
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/utils', utilityRoutes);

// Ruta de prueba API
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: '🌮 API de Tacos Victius funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            auth: '/api/auth',
            admin: '/admin'
        }
    });
});

// Servir archivos estáticos del admin
app.use('/admin-static', express.static(path.join(__dirname, '../public')));

// Servir archivos estáticos del Frontend
app.use(express.static(path.join(__dirname, '../../')));

// Ruta para el Admin Dashboard (debe estar después de static)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Ruta principal - Index (homepage en la raíz)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Ruta de productos
app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, '../../pages/productos.html'));
});

// Ruta de checkout
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '../../pages/checkout.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📱 Frontend:`);
    console.log(`   🏠 Inicio:     http://localhost:${PORT}/`);
    console.log(`   🌮 Productos:  http://localhost:${PORT}/productos`);
    console.log(`   🛒 Checkout:   http://localhost:${PORT}/checkout`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 API:          http://localhost:${PORT}/api`);
    console.log(`👨‍💼 Admin:        http://localhost:${PORT}/admin`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🌮 Modo: ${process.env.NODE_ENV || 'development'}\n`);
});
