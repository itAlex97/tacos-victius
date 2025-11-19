// ==========================================
// APLICACIÓN PRINCIPAL - TACOS VICTIUS
// ==========================================

// Inicialización global
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Verificar sesión de Google
    verificarSesion();
    
    // Inicializar mapa si existe
    inicializarMapa();
    
    // Inicializar formulario de contacto si existe
    inicializarFormularioContacto();
});
