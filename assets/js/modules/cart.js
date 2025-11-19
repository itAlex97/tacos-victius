// ==========================================
// GESTIÓN DEL CARRITO
// ==========================================

function obtenerCarrito() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function guardarCarrito(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarContadorCarrito();
}

function agregarAlCarrito(productId, quantity = 1) {
    const cart = obtenerCarrito();
    // Convertir a string para comparación consistente
    const id = String(productId);
    const existingItem = cart.find(item => String(item.productId) === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId: id, quantity });
    }
    
    guardarCarrito(cart);
}

function eliminarDelCarrito(productId) {
    let cart = obtenerCarrito();
    const id = String(productId);
    cart = cart.filter(item => String(item.productId) !== id);
    guardarCarrito(cart);
    
    // Si estamos en la página de checkout, renderizar de nuevo
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

function limpiarCarrito() {
    localStorage.removeItem('cart');
    actualizarContadorCarrito();
    
    // Si estamos en checkout, renderizar
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

function resetearCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        limpiarCarrito();
        alert('Carrito vaciado correctamente');
    }
}

function calcularTotal() {
    const cart = obtenerCarrito();
    let total = 0;
    
    cart.forEach(item => {
        const product = productos.find(p => String(p.id) === String(item.productId));
        if (product) {
            total += product.price * item.quantity;
        }
    });
    
    return total;
}

function actualizarContadorCarrito() {
    const cart = obtenerCarrito();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}
