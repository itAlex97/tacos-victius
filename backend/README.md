# 🚀 Backend - Tacos Victius

API REST con Node.js, Express y MongoDB para gestionar productos y autenticación de administradores.

## 📋 Requisitos Previos

- Node.js v16 o superior
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
copy .env.example .env
```

Edita `.env` con tus configuraciones:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tacos-victius
JWT_SECRET=tu_secreto_aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Instalar MongoDB (si no lo tienes)

**Opción A: MongoDB local**
- Descarga de: https://www.mongodb.com/try/download/community
- Instala y asegúrate que el servicio esté corriendo

**Opción B: MongoDB Atlas (Cloud - Gratis)**
1. Crea cuenta en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. Obtén la cadena de conexión
4. Actualiza `MONGODB_URI` en `.env`

### 4. Poblar la base de datos

```bash
npm run seed
```

Esto creará:
- ✅ 8 productos iniciales
- ✅ 1 usuario admin

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

## 🚀 Uso

### Iniciar en desarrollo (con auto-reload)

```bash
npm run dev
```

### Iniciar en producción

```bash
npm start
```

El servidor estará disponible en:
- 🌐 API: http://localhost:5000/api
- 👨‍💼 Admin Dashboard: http://localhost:5000/admin

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración MongoDB
│   ├── models/
│   │   ├── Product.js           # Modelo de Producto
│   │   └── Admin.js             # Modelo de Admin
│   ├── controllers/
│   │   ├── productController.js # Lógica de productos
│   │   └── authController.js    # Lógica de autenticación
│   ├── routes/
│   │   ├── productRoutes.js     # Rutas de productos
│   │   └── authRoutes.js        # Rutas de auth
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticación
│   ├── server.js                # Servidor principal
│   └── seed.js                  # Script para poblar BD
├── public/
│   ├── admin.html               # Admin Dashboard
│   └── admin.js                 # JavaScript del admin
├── .env                         # Variables de entorno
└── package.json
```

## 🔌 API Endpoints

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Listar todos los productos | No |
| GET | `/api/products/:id` | Obtener un producto | No |
| GET | `/api/products/available` | Productos disponibles | No |
| POST | `/api/products` | Crear producto | ✅ Sí |
| PUT | `/api/products/:id` | Actualizar producto | ✅ Sí |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ Sí |

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login admin | No |
| GET | `/api/auth/verify` | Verificar token | ✅ Sí |
| POST | `/api/auth/create-admin` | Crear admin | No* |

*⚠️ Remover o proteger en producción

## 📝 Ejemplos de Uso

### Login

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "username": "admin",
    "name": "Administrador Principal",
    "role": "superadmin"
  }
}
```

### Crear Producto (Requiere Token)

```javascript
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Tacos de Carnitas",
  "description": "3 tacos de carnitas con cebolla y cilantro",
  "price": 90.00,
  "image": "https://images.unsplash.com/...",
  "category": "Tacos",
  "available": true,
  "featured": false
}
```

### Actualizar Producto

```javascript
PUT /api/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 95.00,
  "available": false
}
```

### Eliminar Producto

```javascript
DELETE /api/products/{id}
Authorization: Bearer {token}
```

## 👨‍💼 Admin Dashboard

Accede a: `http://localhost:5000/admin`

**Funcionalidades:**
- ✅ Login con autenticación JWT
- ✅ Ver todos los productos en tabla
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Filtrar por categoría
- ✅ Cambiar disponibilidad

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt
- JWT tokens con expiración de 7 días
- Middleware de autenticación en rutas protegidas
- CORS habilitado para desarrollo
- Variables de entorno para datos sensibles

## 🌐 Integración con Frontend

### Actualizar el frontend para usar la API

Modifica `assets/js/data/productos.js`:

```javascript
// En lugar de array estático, obtener de la API
let productos = [];

async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (data.success) {
            productos = data.data;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar al inicio
cargarProductos();
```

## 🚢 Deploy

### Railway (Recomendado)

1. Crea cuenta en https://railway.app
2. Conecta tu repositorio
3. Agrega las variables de entorno
4. Deploy automático

### Render

1. Crea cuenta en https://render.com
2. New → Web Service
3. Conecta repo
4. Configura variables de entorno
5. Deploy

### Variables de entorno en producción:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tacos-victius
JWT_SECRET=super_secreto_cambiar
NODE_ENV=production
```

## 🐛 Troubleshooting

**MongoDB no conecta:**
- Verifica que MongoDB esté corriendo: `mongod --version`
- Revisa la URI en `.env`

**Error de autenticación:**
- Verifica que el token sea válido
- Revisa que el header Authorization tenga formato: `Bearer {token}`

**CORS error:**
- Asegúrate que el frontend y backend estén en los puertos correctos

## 📚 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens
- **bcryptjs** - Hash de contraseñas
- **dotenv** - Variables de entorno
- **cors** - Cross-Origin Resource Sharing

---

**¡Listo para usar! 🌮**
