// ==========================================
// ADMIN DASHBOARD - JAVASCRIPT
// ==========================================

const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('adminToken');
let currentEditId = null;

// ==========================================
// AUTENTICACIÓN
// ==========================================

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            token = data.token;
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminName', data.admin.name);
            showAdminPanel();
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Error al conectar con el servidor');
        console.error(error);
    }
});

// Verificar sesión al cargar
window.addEventListener('load', async () => {
    if (token) {
        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('adminName', data.admin.name);
                showAdminPanel();
            } else {
                logout();
            }
        } catch (error) {
            logout();
        }
    }
});

// Mostrar panel de admin
function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('adminName').textContent = localStorage.getItem('adminName') || 'Admin';
    loadProducts();
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    token = null;
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// Mostrar error de login
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// ==========================================
// GESTIÓN DE PRODUCTOS
// ==========================================

// Cargar productos
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success) {
            displayProducts(data.data);
        }
    } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar productos');
    }
}

// Mostrar productos en tabla
function displayProducts(products) {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = `
            <tr>
                <td><img src="${product.image}" class="product-image" alt="${product.name}"></td>
                <td><strong>${product.name}</strong></td>
                <td>${product.description}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td><strong>$${product.price.toFixed(2)}</strong></td>
                <td>
                    <span class="badge ${product.available ? 'badge-available' : 'badge-unavailable'}">
                        ${product.available ? 'Disponible' : 'No disponible'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduct('${product._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product._id}', '${product.name}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Resetear formulario
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('modalTitle').textContent = 'Nuevo Producto';
    currentEditId = null;
}

// Guardar producto (crear o actualizar)
document.getElementById('productForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
        available: document.getElementById('productAvailable').checked,
        featured: document.getElementById('productFeatured').checked
    };
    
    try {
        const url = currentEditId 
            ? `${API_URL}/products/${currentEditId}`
            : `${API_URL}/products`;
        
        const method = currentEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
            loadProducts();
            resetForm();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el producto');
    }
});

// Editar producto
async function editProduct(id) {
    currentEditId = id;
    
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const product = data.data;
            
            document.getElementById('productId').value = product._id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productImage').value = product.image;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productAvailable').checked = product.available;
            document.getElementById('productFeatured').checked = product.featured;
            
            document.getElementById('modalTitle').textContent = 'Editar Producto';
            
            new bootstrap.Modal(document.getElementById('productModal')).show();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el producto');
    }
}

// Eliminar producto
async function deleteProduct(id, name) {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            loadProducts();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
    }
}

// Cambiar sección
function showSection(section) {
    // Por ahora solo tenemos productos
    console.log('Sección:', section);
}
