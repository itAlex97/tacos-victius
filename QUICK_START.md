# 🚀 Guía Rápida - Tacos Victius

## Inicio Rápido

1. **Abrir el proyecto**: `pages/index.html`
2. **Servidor local** (recomendado): 
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve
   ```
3. **Navegar a**: `http://localhost:8000/pages/`

## 📁 Archivos Principales

| Archivo | Ubicación | Descripción |
|---------|-----------|-------------|
| **Inicio** | `pages/index.html` | Página principal |
| **Productos** | `pages/productos.html` | Catálogo de productos |
| **Carrito** | `pages/checkout.html` | Checkout y pago |
| **Estilos** | `assets/css/style.css` | CSS principal |
| **Config** | `assets/js/config.js` | Configuración de APIs |
| **Productos** | `assets/js/data/productos.js` | Datos de productos |

## 🔧 Tareas Comunes

### Agregar un Producto Nuevo

**Archivo**: `assets/js/data/productos.js`

```javascript
productos.push({
    id: 9,  // Incrementar ID
    name: 'Nombre del Producto',
    description: 'Descripción breve',
    price: 85.00,  // En MXN
    image: 'https://images.unsplash.com/...'  // URL de imagen
});
```

### Cambiar Colores del Sitio

**Archivo**: `assets/css/style.css`

```css
:root {
    --primary-color: #e4572e;      /* Color principal (naranja) */
    --primary-600: #d94a24;        /* Variante más oscura */
    --secondary-color: #22303f;    /* Color secundario (azul oscuro) */
}
```

### Actualizar Ubicación en el Mapa

**Archivo**: `assets/js/config.js`

```javascript
UBICACION: {
    lat: 17.0794699,    // Latitud
    lng: -96.7064197,   // Longitud
    nombre: 'Tacos Victius',
    direccion: 'Tu dirección aquí'
}
```

### Cambiar API Keys

**Archivo**: `assets/js/config.js`

```javascript
const CONFIG = {
    GOOGLE_CLIENT_ID: 'tu-client-id.apps.googleusercontent.com',
    EMAILJS: {
        SERVICE_ID: 'tu-service-id',
        TEMPLATE_ID: 'tu-template-id',
        PUBLIC_KEY: 'tu-public-key'
    },
    PAYPAL_CLIENT_ID: 'tu-paypal-client-id'
};
```

**⚠️ Importante**: También actualizar en los `<script>` tags de los HTML:
- Google: En todos los HTML (`data-client_id`)
- PayPal: Solo en `checkout.html`

## 🎨 Modificar Diseño

### Cambiar Hero Image

**Archivo**: `assets/css/style.css`

Buscar `.hero` y cambiar la URL:

```css
.hero {
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                url('TU-NUEVA-URL-AQUI');
}
```

### Modificar Footer

**Archivos**: `pages/index.html`, `pages/productos.html`, `pages/checkout.html`

Buscar `<footer>` y editar el contenido.

### Cambiar Fuentes

**Archivo**: Todos los HTML en `<head>`

```html
<link href="https://fonts.googleapis.com/css2?family=TuFuente:wght@400;600&display=swap" rel="stylesheet">
```

Luego en `assets/css/style.css`:

```css
:root {
    --font-heading: 'TuFuente', sans-serif;
    --font-body: 'OtraFuente', sans-serif;
}
```

## 🐛 Debugging

### Carrito no funciona

1. Abrir DevTools (F12)
2. Verificar Console para errores
3. Verificar Application > LocalStorage > `cart`
4. Limpiar: `localStorage.clear()`

### Mapa no se muestra

1. Verificar que Leaflet CSS esté cargado
2. Verificar coordenadas en `config.js`
3. Ver errores en Console
4. Verificar que el elemento `#map` existe en el HTML

### Google Sign-In no funciona

1. Verificar `GOOGLE_CLIENT_ID` en `config.js`
2. Verificar dominio autorizado en Google Cloud Console
3. Verificar que el script de Google esté cargado

### PayPal no carga

1. Verificar `PAYPAL_CLIENT_ID`
2. Solo funciona en `checkout.html`
3. Verificar que haya items en el carrito

## 📱 Testing

### Navegadores a probar

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (si es posible)
- ✅ Modo móvil (DevTools)

### Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

### Checklist de Testing

- [ ] Agregar productos al carrito
- [ ] Modificar cantidades en carrito
- [ ] Eliminar productos del carrito
- [ ] Google Sign-In
- [ ] Formulario de contacto
- [ ] Mapa interactivo
- [ ] Compartir en redes sociales
- [ ] Responsive en móvil
- [ ] PayPal checkout (modo sandbox)

## 🚢 Deployment

### Hosting Estático (Recomendado)

**Opciones gratuitas**:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Pasos para GitHub Pages

1. Crear repositorio en GitHub
2. Subir archivos
3. Settings > Pages
4. Source: rama `main`, carpeta `/`
5. Acceder vía `https://username.github.io/repo-name/pages/`

### Variables de Entorno

Para producción, crear `config.prod.js` con las keys de producción.

## 📚 Recursos

### Documentación Externa

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Leaflet.js](https://leafletjs.com/)
- [PayPal Developer](https://developer.paypal.com/)
- [Google Sign-In](https://developers.google.com/identity/gsi/web)
- [EmailJS](https://www.emailjs.com/docs/)

### Documentación del Proyecto

- `README.md` - Descripción general
- `ARCHITECTURE.md` - Arquitectura detallada
- Este archivo - Guía rápida

## 🆘 Soporte

### Errores Comunes

**Error**: `productos is not defined`  
**Solución**: Verificar que `productos.js` se carga antes que otros scripts

**Error**: `Cannot read property 'textContent' of null`  
**Solución**: El elemento no existe en el HTML, verificar el ID

**Error**: CORS error en fetch  
**Solución**: Usar un servidor local, no abrir directamente el HTML

### Contacto

Para preguntas sobre el código, revisar:
1. Comentarios en el código
2. `ARCHITECTURE.md`
3. Este archivo

---

**Happy Coding! 🌮**
