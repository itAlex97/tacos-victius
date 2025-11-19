# 🌮 Tacos Victius - Full Stack Application

Aplicación web completa para restaurante de tacos con sistema de pedidos en línea, carrito de compras y panel de administración.

## 🚀 Demo en Vivo

**Aplicación:** https://tacos-victius.onrender.com/

**Páginas disponibles:**
- 🏠 **Inicio:** https://tacos-victius.onrender.com/
- 🌮 **Productos:** https://tacos-victius.onrender.com/productos
- 🛒 **Carrito:** https://tacos-victius.onrender.com/checkout
- 👨‍💼 **Admin:** https://tacos-victius.onrender.com/admin

**Credenciales Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

---

## 📁 Estructura del Proyecto

```
tacos-victius/
├── index.html                    # Página principal (Homepage)
├── pages/
│   ├── productos.html           # Catálogo de productos
│   └── checkout.html            # Carrito y checkout
├── assets/
│   ├── css/
│   │   └── style.css            # Estilos globales
│   └── js/
│       ├── app.js               # Inicialización
│       ├── config.js            # Configuración
│       ├── data/
│       │   └── productos.js     # API de productos (dinámico)
│       ├── modules/
│       │   ├── auth.js          # Google Sign-In
│       │   ├── cart.js          # Carrito de compras
│       │   ├── contact.js       # EmailJS
│       │   ├── map.js           # Leaflet Maps
│       │   └── social.js        # Social sharing
│       └── pages/
│           ├── productos.js     # Lógica de productos
│           └── checkout.js      # Lógica de checkout
└── backend/
    ├── src/
    │   ├── server.js            # Servidor Express
    │   ├── seed.js              # Poblar base de datos
    │   ├── config/
    │   │   └── database.js      # MongoDB
    │   ├── models/
    │   │   ├── Product.js       # Modelo Producto
    │   │   └── Admin.js         # Modelo Admin
    │   ├── controllers/
    │   │   ├── productController.js
    │   │   └── authController.js
    │   ├── routes/
    │   │   ├── productRoutes.js
    │   │   └── authRoutes.js
    │   └── middleware/
    │       └── auth.js          # JWT Auth
    └── public/
        ├── admin.html           # Dashboard
        └── admin.js             # Admin UI
```

---

## 🛠️ Tecnologías

### Frontend
- **HTML5, CSS3, JavaScript ES6+**
- **Bootstrap 5.3** - UI Framework
- **Leaflet.js** - Mapas interactivos
- **Google Sign-In** - Autenticación social
- **PayPal SDK** - Procesamiento de pagos
- **EmailJS** - Envío de correos

### Backend
- **Node.js v20+** - Runtime
- **Express 4.18** - Web framework
- **MongoDB Atlas** - Base de datos NoSQL
- **Mongoose 8.0** - ODM
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Cross-origin resource sharing

---

## 🚀 Instalación Local

### 1. Clonar repositorio

```bash
git clone https://github.com/itAlex97/tacos-victius.git
cd tacos-victius
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tacos-victius
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development
```

### 4. Poblar la base de datos

```bash
npm run seed
```

### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:5001**

---

## 📱 URLs Profesionales

La aplicación usa URLs limpias y profesionales:

- **Homepage:** `/` (no `/pages/index.html`)
- **Productos:** `/productos`
- **Checkout:** `/checkout`
- **Admin Dashboard:** `/admin`
- **API:** `/api/products`

---

## 🔌 API Endpoints

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Listar productos | No |
| GET | `/api/products/:id` | Obtener producto | No |
| POST | `/api/products` | Crear producto | ✅ Sí |
| PUT | `/api/products/:id` | Actualizar producto | ✅ Sí |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ Sí |

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login admin | No |
| GET | `/api/auth/verify` | Verificar token | ✅ Sí |
| POST | `/api/auth/create-admin` | Crear admin (solo desarrollo) | No |

---

## 🎯 Características

### Frontend (Usuario)
- ✅ Catálogo de productos dinámico desde MongoDB
- ✅ Carrito de compras con persistencia
- ✅ Actualizar/eliminar productos del carrito
- ✅ Sistema de checkout con PayPal
- ✅ Formulario de contacto con EmailJS
- ✅ Mapa interactivo de ubicación
- ✅ Google Sign-In
- ✅ Diseño responsive
- ✅ Compartir en redes sociales
- ✅ URLs profesionales y limpias

### Backend (Admin)
- ✅ Dashboard administrativo completo
- ✅ CRUD de productos con imágenes
- ✅ Autenticación segura con JWT
- ✅ API REST documentada
- ✅ Base de datos MongoDB Atlas
- ✅ Protección de rutas sensibles
- ✅ Detección automática de entorno (local/producción)

---

## 🚢 Deploy en Render

### 1. Subir a GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Configurar en Render

1. Ve a https://render.com/
2. New + → Web Service
3. Conecta tu repositorio `itAlex97/tacos-victius`
4. Configuración:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 3. Variables de entorno en Render

```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tacos-victius
JWT_SECRET=tu_secreto_produccion
NODE_ENV=production
```

### 4. Deploy

Click en "Create Web Service" y espera 3-5 minutos.

### 5. Post-Deploy

1. Crear admin: `POST https://tu-app.onrender.com/api/auth/create-admin`
2. Configurar Google OAuth con dominio de Render
3. Verificar todas las URLs funcionan

---

## 📖 Documentación Adicional

- **[DEPLOY.md](DEPLOY.md)** - Guía completa de deployment
- **[POST_DEPLOY.md](POST_DEPLOY.md)** - Checklist post-deployment
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solución de problemas
- **[backend/README.md](backend/README.md)** - Documentación del backend
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitectura del sistema

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (salt rounds: 10)
- ✅ JWT para autenticación stateless
- ✅ Variables sensibles en archivos .env
- ✅ CORS configurado correctamente
- ✅ Validación de datos en API
- ✅ Middleware de protección de rutas
- ✅ Detección automática de URLs (evita hardcoding)

---

## 👨‍💻 Desarrollo

### Scripts disponibles

```bash
# Backend
npm start          # Iniciar en producción
npm run dev        # Iniciar con nodemon (desarrollo)
npm run seed       # Poblar base de datos inicial
```

### Testing Local

```bash
# Verificar API
curl http://localhost:5001/api/products

# Login admin
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Detección automática de entorno

El código detecta automáticamente si está en local o producción:

```javascript
// assets/js/data/productos.js
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001/api' 
  : `${window.location.origin}/api`;
```

---

## 🎨 Personalización

### Colores (CSS Variables)

```css
--primary-color: #e4572e;
--secondary-color: #22303f;
--background-light: #f6f8f9;
```

### Configuración de APIs

Edita `assets/js/config.js`:
- Google Client ID
- EmailJS credentials
- PayPal Client ID
- Coordenadas del mapa

---

## 📄 Licencia

© 2025 Tacos Victius. Todos los derechos reservados.

---

## 👤 Autor

**Tacos Victius Team**

- GitHub: [@itAlex97](https://github.com/itAlex97)
- Proyecto: [tacos-victius](https://github.com/itAlex97/tacos-victius)

---

## 🙏 Agradecimientos

- Bootstrap por el framework UI
- Leaflet por los mapas interactivos
- MongoDB Atlas por la base de datos en la nube
- Render por el hosting gratuito
- PayPal por el SDK de pagos

---

**¡Hecho con ❤️ y 🌮 en Oaxaca!**
