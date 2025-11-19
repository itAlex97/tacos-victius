// ==========================================
// MODELO DE PRODUCTO - MONGOOSE
// ==========================================

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    image: {
        type: String,
        required: [true, 'La imagen es requerida'],
        default: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
    },
    category: {
        type: String,
        enum: ['Tacos', 'Tlayudas', 'Quesadillas', 'Bebidas', 'Mezcal', 'Otros'],
        default: 'Tacos'
    },
    available: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Método para obtener productos disponibles
productSchema.statics.getAvailable = function() {
    return this.find({ available: true });
};

// Método para obtener productos destacados
productSchema.statics.getFeatured = function() {
    return this.find({ featured: true, available: true });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
