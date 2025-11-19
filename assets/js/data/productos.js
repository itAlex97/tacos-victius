// ==========================================
// DATOS DE PRODUCTOS - INTEGRACIÓN CON API
// ==========================================

const API_URL = 'http://localhost:3000/api';
let productos = [];

// Cargar productos desde la API
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success) {
            // Transformar productos de la API al formato del frontend
            productos = data.data.map(producto => ({
                id: producto._id,
                name: producto.name,
                description: producto.description,
                price: producto.price,
                image: producto.image,
                category: producto.category,
                available: producto.available,
                featured: producto.featured
            }));
            
            console.log(`✅ ${productos.length} productos cargados desde la API`);
            
            // Disparar evento para notificar que los productos están listos
            document.dispatchEvent(new CustomEvent('productosLoaded', { detail: productos }));
        } else {
            console.error('❌ Error al cargar productos:', data.message);
            usarProductosFallback();
        }
    } catch (error) {
        console.error('❌ Error conectando con la API:', error);
        usarProductosFallback();
    }
}

// Productos de respaldo en caso de que la API no esté disponible
function usarProductosFallback() {
    console.warn('⚠️ Usando productos de respaldo (API no disponible)');
    
    productos = [
        {
            id: 1,
            name: 'Tacos de Asada',
            description: '3 tacos con carne asada, cebolla, cilantro y salsa',
            price: 85.00,
            image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
            category: 'Tacos',
            available: true
        },
        {
            id: 2,
            name: 'Tacos al Pastor',
            description: '3 tacos al pastor con piña, cebolla y cilantro',
            price: 80.00,
            image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
            category: 'Tacos',
            available: true
        },
        {
            id: 3,
            name: 'Tlayuda Oaxaqueña',
            description: 'Tortilla grande con frijoles, quesillo, tasajo y aguacate',
            price: 120.00,
            image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400',
            category: 'Especialidades',
            available: true
        },
        {
            id: 4,
            name: 'Mezcal Artesanal',
            description: 'Copa de mezcal tradicional oaxaqueño',
            price: 65.00,
            image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
            category: 'Bebidas',
            available: true
        },
        {
            id: 5,
            name: 'Tacos de Chorizo',
            description: '3 tacos de chorizo oaxaqueño con cebolla y cilantro',
            price: 75.00,
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            category: 'Tacos',
            available: true
        },
        {
            id: 6,
            name: 'Quesadillas Oaxaqueñas',
            description: 'Quesadillas con quesillo oaxaqueño y flor de calabaza',
            price: 95.00,
            image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400',
            category: 'Especialidades',
            available: true
        },
        {
            id: 7,
            name: 'Agua de Horchata',
            description: 'Refrescante agua de horchata tradicional',
            price: 35.00,
            image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400',
            category: 'Bebidas',
            available: true
        },
        {
            id: 8,
            name: 'Memelas Oaxaqueñas',
            description: 'Memelas con frijoles, quesillo, salsa verde y cebolla',
            price: 70.00,
            image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
            category: 'Especialidades',
            available: true
        }
    ];
    
    document.dispatchEvent(new CustomEvent('productosLoaded', { detail: productos }));
}

// Cargar productos al inicio
cargarProductos();
