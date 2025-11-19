// ==========================================
// PÁGINA DE CHECKOUT (CARRITO)
// ==========================================

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const emptyCartDiv = document.getElementById('empty-cart');
    const cart = obtenerCarrito();
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '';
        emptyCartDiv.style.display = 'block';
        document.getElementById('paypal-button-container').innerHTML = '';
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    let html = '';
    
    cart.forEach(item => {
        const product = productos.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            html += `
                <div class="cart-item">
                    <div class="row align-items-center">
                        <div class="col-md-2 mb-2 mb-md-0">
                            <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                        </div>
                        <div class="col-md-4 mb-2 mb-md-0">
                            <h6 class="mb-1">${product.name}</h6>
                            <p class="text-muted small mb-0">${product.description}</p>
                        </div>
                        <div class="col-md-2 mb-2 mb-md-0">
                            <p class="mb-0">$${product.price.toFixed(2)}</p>
                        </div>
                        <div class="col-md-2 mb-2 mb-md-0">
                            <div class="input-group input-group-sm">
                                <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${product.id}, ${item.quantity - 1})">-</button>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly style="max-width: 50px;">
                                <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${product.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="col-md-2 text-end">
                            <strong>$${itemTotal.toFixed(2)}</strong>
                            <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarDelCarrito(${product.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    cartItemsDiv.innerHTML = html;
    updateTotals();
    renderPayPalButton();
}

function updateTotals() {
    const total = calcularTotal();
    document.getElementById('subtotal').textContent = `$${total.toFixed(2)} MXN`;
    document.getElementById('total').textContent = `$${total.toFixed(2)} MXN`;
}

function actualizarCantidad(productId, newQuantity) {
    if (newQuantity < 1) {
        eliminarDelCarrito(productId);
        return;
    }
    if (newQuantity > 20) return;
    
    const cart = obtenerCarrito();
    const item = cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        guardarCarrito(cart);
        renderCart();
    }
}

function renderPayPalButton() {
    const total = calcularTotal();
    if (total === 0) return;
    
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer) return;
    
    paypalContainer.innerHTML = '';
    
    paypal.Buttons({
        style: {
            color: 'gold',
            shape: 'pill',
            label: 'pay',
            height: 50
        },
        createOrder: function(data, actions) {
            const cart = obtenerCarrito();
            const items = cart.map(item => {
                const product = productos.find(p => p.id === item.productId);
                return {
                    name: product.name,
                    unit_amount: {
                        currency_code: 'MXN',
                        value: product.price.toFixed(2)
                    },
                    quantity: item.quantity
                };
            });
            
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'MXN',
                                value: total.toFixed(2)
                            }
                        }
                    },
                    items: items,
                    description: 'Pedido Tacos Victius'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert(`¡Pago completado exitosamente!\n\nGracias ${details.payer.name.given_name}!\n\nTu pedido ha sido confirmado.\nID: ${details.id}`);
                limpiarCarrito();
                renderCart();
            });
        },
        onError: function(err) {
            console.error('Error PayPal:', err);
            alert('Error al procesar el pago. Intenta de nuevo.');
        },
        onCancel: function(data) {
            alert('Pago cancelado.');
        }
    }).render('#paypal-button-container');
}

// Inicializar al cargar la página
window.addEventListener('load', () => {
    renderCart();
});
