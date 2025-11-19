// ==========================================
// CONFIGURACIÓN DE LA APLICACIÓN (FRONTEND)
// ==========================================
// Solo datos públicos - Las credenciales están en el backend
// ==========================================

const CONFIG = {
    // API del backend
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5001/api' 
        : `${window.location.origin}/api`,
    
    // Estos se cargarán dinámicamente desde el backend
    GOOGLE_CLIENT_ID: null,
    PAYPAL_CLIENT_ID: null,
    UBICACION: null
};

// Cargar configuración pública del backend
(async function cargarConfig() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/utils/config`);
        const data = await response.json();
        
        if (data.success) {
            CONFIG.GOOGLE_CLIENT_ID = data.config.googleClientId;
            CONFIG.PAYPAL_CLIENT_ID = data.config.paypalClientId;
            CONFIG.UBICACION = data.config.ubicacion;
            console.log('✅ Configuración cargada desde backend (sin exponer secrets)');
        }
    } catch (error) {
        console.error('❌ Error cargando configuración:', error);
        // Fallback local solo para desarrollo
        CONFIG.UBICACION = {
            lat: 17.0794699,
            lng: -96.7064197,
            nombre: 'Tacos Victius',
            direccion: 'Av. Fuerza Aérea Mexicana, Antiguo Aeropuerto, 68050 Oaxaca de Juárez, Oax.'
        };
    }
})();

