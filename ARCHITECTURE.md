# 📚 Documentación de Arquitectura - Tacos Victius

## 🏗️ Arquitectura del Proyecto

### Principios de Diseño

1. **Separación de Responsabilidades**: Cada módulo tiene una única responsabilidad
2. **HTML Limpio**: Sin código JavaScript inline
3. **Modularización**: Código JavaScript dividido en módulos reutilizables
4. **Escalabilidad**: Fácil de mantener y extender

### Estructura de Carpetas

```
assets/
├── css/                    # Estilos
│   └── style.css          # Archivo principal de estilos
│
└── js/                     # JavaScript
    ├── config.js          # ⚙️ Configuración (API keys, constantes)
    ├── app.js             # 🚀 Punto de entrada principal
    │
    ├── data/              # 📊 Datos de la aplicación
    │   └── productos.js   # Catálogo de productos
    │
    ├── modules/           # 🔧 Módulos funcionales reutilizables
    │   ├── cart.js       # Gestión del carrito de compras
    │   ├── auth.js       # Autenticación con Google
    │   ├── contact.js    # Formulario de contacto (EmailJS)
    │   ├── map.js        # Mapa interactivo (Leaflet)
    │   └── social.js     # Compartir en redes sociales
    │
    └── pages/             # 📄 Lógica específica de cada página
        ├── productos.js   # Renderizado de productos
        └── checkout.js    # Carrito y pagos PayPal
```

## 📋 Descripción de Módulos

### 1. **config.js** - Configuración Central

**Propósito**: Almacenar todas las configuraciones y constantes del proyecto.

**Contiene**:
- API Keys (Google, EmailJS, PayPal)
- Configuración de ubicación del restaurante
- Constantes globales

**Ventajas**:
- Fácil mantenimiento
- Cambios centralizados
- Seguridad (separar del código)

### 2. **app.js** - Inicialización Principal

**Propósito**: Punto de entrada que inicializa la aplicación.

**Responsabilidades**:
- Inicializar módulos al cargar la página
- Actualizar contador del carrito
- Verificar sesión de usuario
- Inicializar mapa y formulario de contacto

### 3. **data/productos.js** - Catálogo de Productos

**Propósito**: Almacenar el catálogo completo de productos.

**Estructura**:
```javascript
{
    id: number,
    name: string,
    description: string,
    price: number,
    image: string (URL)
}
```

### 4. **modules/cart.js** - Gestión del Carrito

**Funciones Principales**:
- `obtenerCarrito()`: Lee el carrito desde localStorage
- `guardarCarrito()`: Guarda el carrito en localStorage
- `agregarAlCarrito()`: Añade productos
- `eliminarDelCarrito()`: Elimina productos
- `calcularTotal()`: Calcula el total del pedido
- `actualizarContadorCarrito()`: Actualiza el badge del navbar

**Storage**: LocalStorage del navegador

### 5. **modules/auth.js** - Autenticación

**Funciones Principales**:
- `handleCredentialResponse()`: Callback de Google Sign-In
- `parseJwt()`: Decodifica el token JWT
- `logoutGoogle()`: Cierra sesión
- `verificarSesion()`: Verifica sesión guardada

**Integración**: Google OAuth 2.0

### 6. **modules/contact.js** - Formulario de Contacto

**Funciones Principales**:
- `inicializarFormularioContacto()`: Configura el evento submit

**Integración**: EmailJS API

**Flujo**:
1. Usuario completa el formulario
2. JavaScript captura el submit
3. Envía datos a EmailJS
4. Muestra confirmación al usuario

### 7. **modules/map.js** - Mapa Interactivo

**Funciones Principales**:
- `inicializarMapa()`: Crea y configura el mapa

**Integración**: Leaflet.js + OpenStreetMap

**Características**:
- Marcador en la ubicación del restaurante
- Popup con información
- Redimensionamiento responsive

### 8. **modules/social.js** - Redes Sociales

**Funciones Principales**:
- `compartirFacebook()`: Abre diálogo de compartir en Facebook
- `compartirInstagram()`: Muestra instrucciones para Instagram
- `compartirTwitter()`: Abre diálogo de compartir en Twitter

### 9. **pages/productos.js** - Página de Productos

**Funciones Principales**:
- `renderizarProductos()`: Genera las tarjetas de productos
- `incrementQuantity()`: Incrementa cantidad a comprar
- `decrementQuantity()`: Decrementa cantidad a comprar
- `addToCart()`: Agrega al carrito y muestra notificación

**Inicialización**: `DOMContentLoaded`

### 10. **pages/checkout.js** - Página de Checkout

**Funciones Principales**:
- `renderCart()`: Renderiza los items del carrito
- `updateTotals()`: Actualiza los totales
- `actualizarCantidad()`: Modifica cantidad de un producto
- `renderPayPalButton()`: Crea el botón de pago PayPal

**Integración**: PayPal SDK

**Inicialización**: `window.load`

## 🔄 Flujo de Carga de Scripts

### Orden de Carga en HTML

```html
<!-- 1. Librerías externas -->
<script src="bootstrap.bundle.min.js"></script>
<script src="leaflet.js"></script>

<!-- 2. Configuración -->
<script src="../assets/js/config.js"></script>

<!-- 3. Datos -->
<script src="../assets/js/data/productos.js"></script>

<!-- 4. Módulos core -->
<script src="../assets/js/modules/cart.js"></script>
<script src="../assets/js/modules/auth.js"></script>

<!-- 5. Módulos específicos según página -->
<script src="../assets/js/modules/contact.js"></script>
<script src="../assets/js/modules/map.js"></script>
<script src="../assets/js/modules/social.js"></script>

<!-- 6. Lógica de página (si aplica) -->
<script src="../assets/js/pages/productos.js"></script>
<!-- o -->
<script src="../assets/js/pages/checkout.js"></script>

<!-- 7. Inicialización -->
<script src="../assets/js/app.js"></script>
```

### ¿Por qué este orden?

1. **Librerías primero**: Bootstrap, Leaflet deben estar disponibles
2. **Configuración**: Define constantes usadas en otros módulos
3. **Datos**: Define el array de productos
4. **Módulos core**: Funciones compartidas entre páginas
5. **Módulos específicos**: Funcionalidades adicionales
6. **Lógica de página**: Código específico de cada página
7. **Inicialización**: Arranca la aplicación

## 🎯 Ventajas de Esta Arquitectura

### 1. **Mantenibilidad**
- Código organizado y fácil de encontrar
- Cada archivo tiene una responsabilidad clara

### 2. **Escalabilidad**
- Fácil agregar nuevos módulos
- Fácil agregar nuevas páginas

### 3. **Reutilización**
- Módulos compartidos entre páginas
- No duplicación de código

### 4. **Debugging**
- Fácil identificar dónde está un bug
- Stack traces más claros

### 5. **Performance**
- Carga solo los scripts necesarios por página
- HTML limpio = más rápido de parsear

### 6. **Colaboración**
- Varios desarrolladores pueden trabajar simultáneamente
- Menos conflictos de merge

## 🔧 Cómo Extender el Proyecto

### Agregar un Nuevo Módulo

1. Crear archivo en `assets/js/modules/nuevo-modulo.js`
2. Definir funciones del módulo
3. Incluir en las páginas que lo necesiten
4. Llamar desde `app.js` si es global

### Agregar una Nueva Página

1. Crear archivo HTML en `pages/nueva-pagina.html`
2. Incluir scripts necesarios
3. Crear archivo específico en `assets/js/pages/nueva-pagina.js`
4. Actualizar navegación en todas las páginas

### Agregar Nuevos Productos

Editar `assets/js/data/productos.js`:

```javascript
productos.push({
    id: 9,
    name: 'Producto Nuevo',
    description: 'Descripción',
    price: 99.00,
    image: 'url-imagen'
});
```

## 🚨 Consideraciones de Seguridad

### API Keys

**IMPORTANTE**: Las API keys en `config.js` están expuestas al cliente.

**Recomendaciones**:
1. Usar restricciones de dominio en Google Cloud Console
2. Limitar el uso de las keys en los dashboards de cada servicio
3. Para producción, considerar un backend que maneje las keys

### LocalStorage

- No almacenar información sensible
- Solo se usa para carrito y sesión de Google

## 📱 Responsive Design

- Bootstrap 5 grid system
- Mobile-first approach
- Breakpoints: sm (576px), md (768px), lg (992px), xl (1200px)

## 🎨 Convenciones de Código

### Nombres de Funciones
- `camelCase` para funciones normales
- Verbos descriptivos: `obtener`, `guardar`, `actualizar`, `renderizar`

### Nombres de Variables
- `camelCase` para variables
- Descriptivos y claros

### Comentarios
- Secciones con banners ASCII
- Comentarios inline solo cuando sea necesario explicar lógica compleja

### Formato
- Indentación: 4 espacios
- Llaves en nueva línea para funciones
- Punto y coma obligatorio

---

**Última actualización**: Noviembre 2025  
**Versión**: 2.0 (Arquitectura Modular)
