// ==========================================
// SCRIPT PARA POBLAR LA BASE DE DATOS
// ==========================================

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Admin = require('./models/Admin');

// Productos iniciales (los mismos que tienes actualmente)
const products = [
    {
        name: 'Tacos de Asada',
        description: '3 tacos con carne asada, cebolla, cilantro y salsa',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
        category: 'Tacos',
        available: true,
        featured: true
    },
    {
        name: 'Tacos al Pastor',
        description: '3 tacos al pastor con piña, cebolla y cilantro',
        price: 80.00,
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
        category: 'Tacos',
        available: true,
        featured: true
    },
    {
        name: 'Tlayuda Oaxaqueña',
        description: 'Tortilla grande con frijoles, quesillo, tasajo y aguacate',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400',
        category: 'Tlayudas',
        available: true,
        featured: false
    },
    {
        name: 'Mezcal Artesanal',
        description: 'Copa de mezcal tradicional oaxaqueño',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
        category: 'Mezcal',
        available: true,
        featured: false
    },
    {
        name: 'Tacos de Chorizo',
        description: '3 tacos de chorizo oaxaqueño con cebolla y cilantro',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
        category: 'Tacos',
        available: true,
        featured: false
    },
    {
        name: 'Quesadillas Oaxaqueñas',
        description: 'Quesadillas con quesillo oaxaqueño y flor de calabaza',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400',
        category: 'Quesadillas',
        available: true,
        featured: false
    },
    {
        name: 'Agua de Horchata',
        description: 'Refrescante agua de horchata tradicional',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400',
        category: 'Bebidas',
        available: true,
        featured: false
    },
    {
        name: 'Memelas Oaxaqueñas',
        description: 'Memelas con frijoles, quesillo, salsa verde y cebolla',
        price: 70.00,
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
        category: 'Otros',
        available: true,
        featured: false
    }
];

// Conectar a MongoDB y poblar
const seedDatabase = async () => {
    try {
        // Conectar
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Product.deleteMany();
        await Admin.deleteMany();
        console.log('🗑️  Colecciones limpiadas');

        // Insertar productos
        await Product.insertMany(products);
        console.log('📦 Productos insertados:', products.length);

        // Crear admin por defecto
        const admin = await Admin.create({
            username: process.env.ADMIN_USERNAME || 'admin',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            name: 'Administrador Principal',
            role: 'superadmin'
        });
        console.log('👨‍💼 Admin creado:', admin.username);

        console.log('\n✅ Base de datos poblada exitosamente');
        console.log('\n📝 Credenciales de acceso:');
        console.log(`   Usuario: ${admin.username}`);
        console.log(`   Contraseña: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        console.log('\n🚀 Puedes iniciar el servidor con: npm start\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedDatabase();
