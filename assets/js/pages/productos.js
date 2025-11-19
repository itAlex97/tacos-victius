// ==========================================
// PÁGINA DE PRODUCTOS
// ==========================================

function renderizarProductos() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = ''; // Limpiar contenedor
    
    productos.forEach(product => {
        const productCard = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card product-card h-100 border-0 shadow-sm">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">${product.description}</p>
                        <div class="mt-auto">
                            <p class="h4 text-primary mb-3" style="color: var(--primary-color) !important;">$${product.price.toFixed(2)} MXN</p>
                            <div class="quantity-control mb-3">
                                <button class="btn btn-outline-secondary" onclick="decrementQuantity('${product.id}')">-</button>
                                <input type="number" class="form-control" id="qty-${product.id}" value="1" min="1" max="20" readonly>
                                <button class="btn btn-outline-secondary" onclick="incrementQuantity('${product.id}')">+</button>
                            </div>
                            <button class="btn btn-primary w-100" style="background-color: var(--primary-color); border: none;" onclick="addToCart('${product.id}')">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

function incrementQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (parseInt(input.value) < 20) {
        input.value = parseInt(input.value) + 1;
    }
}

function decrementQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    agregarAlCarrito(productId, quantity);
    
    // Mostrar toast
    const toastElement = document.getElementById('cart-toast');
    if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
    
    // Resetear cantidad
    document.getElementById(`qty-${productId}`).value = 1;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que los productos se carguen desde la API
    if (productos.length > 0) {
        renderizarProductos();
    } else {
        // Escuchar el evento de productos cargados
        document.addEventListener('productosLoaded', () => {
            renderizarProductos();
        }, { once: true });
    }
});
