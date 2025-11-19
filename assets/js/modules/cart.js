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
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    guardarCarrito(cart);
}

function eliminarDelCarrito(productId) {
    let cart = obtenerCarrito();
    cart = cart.filter(item => item.productId !== productId);
    guardarCarrito(cart);
    
    // Si estamos en la página de checkout, renderizar de nuevo
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

function limpiarCarrito() {
    localStorage.removeItem('cart');
    actualizarContadorCarrito();
}

function calcularTotal() {
    const cart = obtenerCarrito();
    let total = 0;
    
    cart.forEach(item => {
        const product = productos.find(p => p.id === item.productId);
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
