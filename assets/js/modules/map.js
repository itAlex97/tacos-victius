// ==========================================
// MAPA CON LEAFLET
// ==========================================

function inicializarMapa() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const ubicacion = [CONFIG.UBICACION.lat, CONFIG.UBICACION.lng];
    const map = L.map("map").setView(ubicacion, 16);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker(ubicacion)
        .addTo(map)
        .bindPopup(`<b>${CONFIG.UBICACION.nombre}</b><br>¡El mejor sabor está aquí!`)
        .openPopup();

    setTimeout(function() {
        try {
            map.invalidateSize();
        } catch (e) {
            console.warn('map.invalidateSize failed', e);
        }
    }, 200);
}
