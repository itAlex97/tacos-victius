# 🧹 Separación Frontend/Backend - Arquitectura Ligera

## ✅ Problema Resuelto

**Antes:** Credenciales expuestas en `config.js` visible desde F12 del navegador  
**Ahora:** Solo código de manipulación del DOM en el frontend, credenciales en el backend

---

## 📁 Arquitectura Implementada

```
Frontend (assets/js/)          Backend (src/routes/)
═══════════════════════        ═══════════════════════
✅ DOM Manipulation            ✅ Lógica de Negocio
✅ Event Listeners             ✅ Credenciales
✅ Renderizado                 ✅ APIs de Terceros
✅ LocalStorage                ✅ Validaciones
❌ NO Credenciales             ❌ NO Manipulación DOM
❌ NO Lógica Sensible
```

---

## 🔄 Flujo de Datos

### Antes (Inseguro):
```
Usuario → Frontend → EmailJS API directamente
                 ↓
            (Credenciales expuestas en config.js)
```

### Ahora (Seguro):
```
Usuario → Frontend → Backend → EmailJS API
                 ↓         ↓
         Solo DOM      Credenciales
                      protegidas en .env
```

---

## 📂 Archivos Modificados

### Backend (Nuevos)

**`backend/src/routes/utilityRoutes.js`**
```javascript
// Endpoints mínimos para operaciones sensibles
POST /api/utils/send-email    // Envía emails sin exponer EmailJS
GET  /api/utils/config         // Retorna solo config pública
```

### Frontend (Actualizados)

**`assets/js/config.js`** - ✅ YA NO tiene credenciales
```javascript
const CONFIG = {
    API_URL: '...',              // ✅ OK
    GOOGLE_CLIENT_ID: null,      // ✅ Se carga del backend
    PAYPAL_CLIENT_ID: null,      // ✅ Se carga del backend
    UBICACION: null              // ✅ Se carga del backend
};
```

**`assets/js/modules/contact.js`** - ✅ Solo manipula DOM
```javascript
// Antes: fetch('https://api.emailjs.com/...', { credenciales })
// Ahora: fetch(`${CONFIG.API_URL}/utils/send-email`, { datos })
```

---

## 🔒 Comparación de Seguridad

### ❌ Antes (F12 en el navegador mostraba):

```javascript
// config.js (VISIBLE PARA TODOS)
EMAILJS: {
    SERVICE_ID: 'service_y8j6oxr',      // 🚨 Expuesto
    TEMPLATE_ID: 'template_5vqnyld',    // 🚨 Expuesto
    PUBLIC_KEY: 'aMX4zYtId4JgUHYBF'     // 🚨 Expuesto
}
```

### ✅ Ahora (F12 en el navegador muestra):

```javascript
// config.js (SOLO CONFIGURACIÓN PÚBLICA)
const CONFIG = {
    API_URL: 'http://localhost:5001/api',  // ✅ OK (público)
    GOOGLE_CLIENT_ID: null,                // ✅ Se carga dinámicamente
    PAYPAL_CLIENT_ID: null,                // ✅ Se carga dinámicamente
    UBICACION: null                        // ✅ Se carga dinámicamente
};
```

---

## 🎯 Archivos que SÍ deben aparecer en F12

**Esto es NORMAL y NO es un problema de seguridad:**

✅ `style.css` - Estilos (necesarios para renderizar)  
✅ `cart.js` - Lógica del carrito (cliente)  
✅ `map.js` - Mapa de Leaflet (cliente)  
✅ `social.js` - Compartir redes (cliente)  
✅ `productos.js` - Renderizado productos (cliente)  
✅ `checkout.js` - UI del checkout (cliente)  
✅ `auth.js` - Manejo de sesión (cliente)  
✅ `app.js` - Inicialización (cliente)  
✅ `config.js` - **AHORA solo tiene configuración pública**  

---

## 🔐 Archivos que NO deben aparecer en F12

**Estos están protegidos en el backend:**

❌ `.env` - Variables de entorno  
❌ `utilityRoutes.js` - Lógica del servidor  
❌ Credenciales de EmailJS  
❌ Secrets de PayPal  
❌ Google Client Secret  

---

## 🧪 Testing

### 1. Verificar que NO hay credenciales expuestas

Abre F12 → Sources → Busca `config.js`:
```javascript
// Debe verse así (SIN credenciales hardcodeadas):
const CONFIG = {
    API_URL: 'http://localhost:5001/api',
    GOOGLE_CLIENT_ID: null,  // ← Se carga dinámicamente
    // NO debe haber EMAILJS: { ... }
};
```

### 2. Probar formulario de contacto

1. Llena el formulario en la homepage
2. Click "Enviar"
3. Abre Network tab (F12)
4. Debe verse: `POST http://localhost:5001/api/utils/send-email`
5. **NO** debe verse: `POST https://api.emailjs.com/...`

### 3. Verificar configuración pública

Abre consola:
```javascript
console.log(CONFIG);
// Debe mostrar: { API_URL, GOOGLE_CLIENT_ID, PAYPAL_CLIENT_ID, UBICACION }
```

---

## 🚀 Deploy a Render

Agregar estas variables de entorno en Render:

```env
EMAILJS_SERVICE_ID=service_y8j6oxr
EMAILJS_TEMPLATE_ID=template_5vqnyld
EMAILJS_PUBLIC_KEY=aMX4zYtId4JgUHYBF
GOOGLE_CLIENT_ID=779089677765-...
PAYPAL_CLIENT_ID=AZn954yotacFl2o...
```

---

## ✅ Beneficios de esta Solución

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Credenciales en F12** | ❌ Visibles | ✅ Ocultas |
| **Lógica en Frontend** | ❌ Mezclada | ✅ Solo DOM |
| **Complejidad** | ⚙️ Baja | ⚙️⚙️ Media |
| **MVC Completo** | ❌ No | ⚠️ No (ligero) |
| **Seguridad** | 🔒 Baja | 🔒🔒 Media-Alta |

---

## 📝 Resumen

**Frontend (assets/js/):**  
- Solo manipula el DOM  
- Escucha eventos del usuario  
- Renderiza componentes visuales  
- **NO contiene credenciales**  

**Backend (src/routes/):**  
- Procesa operaciones sensibles  
- Guarda credenciales en `.env`  
- Expone solo endpoints necesarios  
- Retorna solo datos públicos al frontend  

---

**✨ Tu código ahora sigue mejores prácticas sin necesidad de implementar MVC completo.**
