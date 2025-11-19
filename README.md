# 🌮 Tacos Victius - Sitio Web

Sitio web de e-commerce para Tacos Victius, restaurante de auténtica comida oaxaqueña.

## 📁 Estructura del Proyecto

```
tacos-victius/
│
├── assets/                          # Recursos del proyecto
│   ├── css/                        # Archivos de estilos
│   │   └── style.css              # Estilos principales
│   │
│   └── js/                         # JavaScript modularizado
│       ├── config.js              # Configuración global (APIs, keys)
│       ├── app.js                 # Inicialización principal
│       │
│       ├── data/                  # Datos de la aplicación
│       │   └── productos.js       # Catálogo de productos
│       │
│       ├── modules/               # Módulos funcionales
│       │   ├── cart.js           # Gestión del carrito
│       │   ├── auth.js           # Autenticación Google
│       │   ├── contact.js        # Formulario de contacto
│       │   ├── map.js            # Mapa con Leaflet
│       │   └── social.js         # Compartir en redes sociales
│       │
│       └── pages/                 # Lógica específica de páginas
│           ├── productos.js      # Renderizado de productos
│           └── checkout.js       # Carrito y pagos PayPal
│
├── pages/                          # Páginas HTML
│   ├── index.html                 # Página principal
│   ├── productos.html             # Catálogo de productos
│   └── checkout.html              # Carrito de compras
│
└── old/                           # Archivos anteriores (deprecados)
    ├── index.html
    ├── productos.html
    ├── checkout.html
    ├── old-homepage.html
    ├── app.js
    └── styles/
        └── style.css

```

## 🚀 Características

- **Carrito de Compras**: Sistema completo con LocalStorage
- **Pagos en Línea**: Integración con PayPal
- **Autenticación**: Login con Google OAuth
- **Mapa Interactivo**: Ubicación con Leaflet.js
- **Formulario de Contacto**: Envío de emails con EmailJS
- **Redes Sociales**: Botones para compartir
- **Diseño Responsive**: Compatible con móviles y tablets

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.0
- **Mapas**: Leaflet.js
- **Fuentes**: Google Fonts (Poppins, Open Sans)
- **APIs**:
  - Google Sign-In
  - PayPal SDK
  - EmailJS
  - OpenStreetMap

## 📦 Instalación

1. Clonar el repositorio
2. Abrir `pages/index.html` en un navegador
3. No requiere instalación de dependencias (todo vía CDN)

## 🔧 Configuración

Editar `assets/js/config.js` para configurar:
- Client ID de Google
- Credenciales de EmailJS
- Client ID de PayPal
- Coordenadas del mapa

## 📱 Uso

### Estructura de URLs

- Inicio: `/pages/index.html`
- Productos: `/pages/productos.html`
- Carrito: `/pages/checkout.html`

### Módulos JavaScript

Todos los archivos HTML cargan los scripts en este orden:

1. `config.js` - Configuración
2. `productos.js` (data) - Datos de productos
3. `cart.js` - Funciones del carrito
4. `auth.js` - Autenticación
5. Módulos específicos según la página
6. `app.js` - Inicialización

## 🎨 Personalización

### Colores

Variables CSS en `assets/css/style.css`:

```css
--primary-color: #e4572e;
--secondary-color: #22303f;
--background-light: #f6f8f9;
```

### Productos

Editar el array en `assets/js/data/productos.js`

## 📄 Licencia

© 2025 Tacos Victius. Todos los derechos reservados.

## 👨‍💻 Desarrollo

- Separación de responsabilidades
- Código modular y reutilizable
- HTML limpio sin scripts inline
- Arquitectura escalable

---

**Hecho con ❤️ en Oaxaca**
