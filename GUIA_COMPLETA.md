# 🌮 Tacos Victius - Guía Completa

## 🎉 ¡Sistema Completado!

Tu aplicación ahora cuenta con:
- ✅ Frontend modular y profesional
- ✅ Backend con Node.js + Express + MongoDB
- ✅ API REST completa
- ✅ Admin Dashboard funcional
- ✅ Autenticación con JWT
- ✅ Base de datos en la nube (MongoDB Atlas)

---

## 🚀 Inicio Rápido

### 1. Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará en: **http://localhost:5001**

### 2. Abrir el Frontend

Abre en tu navegador:
- **Página principal:** `file:///C:/projects/appsweb/tacos-victius/index.html`
- **Productos:** `file:///C:/projects/appsweb/tacos-victius/pages/productos.html`
- **Admin Dashboard:** http://localhost:5001/admin

### 3. Acceder al Admin Dashboard

**URL:** http://localhost:5001/admin

**Credenciales:**
- Usuario: `admin`
- Contraseña: `admin123`

---

## 📁 Estructura del Proyecto

```
tacos-victius/
├── index.html                    # Página principal
├── assets/
│   ├── css/
│   │   └── style.css            # Estilos globales
│   └── js/
│       ├── app.js               # Inicialización principal
│       ├── config.js            # Configuración global
│       ├── data/
│       │   └── productos.js     # Carga productos desde API
│       ├── modules/
│       │   ├── auth.js          # Google Sign-In
│       │   ├── cart.js          # Carrito de compras
│       │   ├── contact.js       # EmailJS
│       │   ├── map.js           # Leaflet Map
│       │   └── social.js        # Social sharing
│       └── pages/
│           ├── checkout.js      # Página de checkout
│           └── productos.js     # Página de productos
├── pages/
│   ├── productos.html           # Catálogo de productos
│   └── checkout.html            # Finalizar compra
└── backend/
    ├── src/
    │   ├── server.js            # Servidor Express
    │   ├── config/
    │   │   └── database.js      # Conexión MongoDB
    │   ├── models/
    │   │   ├── Product.js       # Modelo de Producto
    │   │   └── Admin.js         # Modelo de Admin
    │   ├── controllers/
    │   │   ├── productController.js
    │   │   └── authController.js
    │   ├── routes/
    │   │   ├── productRoutes.js
    │   │   └── authRoutes.js
    │   ├── middleware/
    │   │   └── auth.js          # Verificación JWT
    │   └── seed.js              # Poblar base de datos
    ├── public/
    │   ├── admin.html           # Dashboard admin
    │   └── admin.js             # Lógica del admin
    ├── .env                     # Variables de entorno
    └── package.json
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5001/api
```

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Listar todos los productos | No |
| GET | `/products/:id` | Obtener un producto | No |
| POST | `/products` | Crear producto | ✅ Sí |
| PUT | `/products/:id` | Actualizar producto | ✅ Sí |
| DELETE | `/products/:id` | Eliminar producto | ✅ Sí |

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Login admin | No |
| GET | `/auth/verify` | Verificar token | ✅ Sí |

---

## 🛠️ Funcionalidades

### Frontend

#### 1. Catálogo de Productos
- ✅ Carga dinámica desde API
- ✅ Tarjetas responsivas con Bootstrap
- ✅ Control de cantidad (+/-)
- ✅ Agregar al carrito
- ✅ Fallback si API no disponible

#### 2. Carrito de Compras
- ✅ Agregar/eliminar productos
- ✅ Actualizar cantidades
- ✅ Calcular totales
- ✅ Persistencia en localStorage
- ✅ Contador en navbar

#### 3. Checkout
- ✅ Resumen de compra
- ✅ Formulario de datos
- ✅ Integración PayPal
- ✅ Confirmación de pedido

#### 4. Contacto
- ✅ Formulario de contacto
- ✅ Envío de emails con EmailJS
- ✅ Validación de campos

#### 5. Mapa
- ✅ Ubicación con Leaflet.js
- ✅ Marcador interactivo
- ✅ Información de contacto

#### 6. Autenticación
- ✅ Google Sign-In
- ✅ Gestión de sesión
- ✅ Perfil de usuario

### Backend

#### 1. API REST
- ✅ Express.js 4.18
- ✅ CORS habilitado
- ✅ JSON parsing
- ✅ Error handling

#### 2. Base de Datos
- ✅ MongoDB Atlas
- ✅ Mongoose ODM
- ✅ Schemas con validación
- ✅ Métodos personalizados

#### 3. Autenticación
- ✅ JWT tokens
- ✅ Bcrypt para passwords
- ✅ Middleware de protección
- ✅ Expiración de tokens (7 días)

#### 4. Admin Dashboard
- ✅ Login seguro
- ✅ Ver todos los productos
- ✅ Crear productos
- ✅ Editar productos
- ✅ Eliminar productos
- ✅ Interfaz con Bootstrap 5
- ✅ Responsive design

---

## 🔐 Seguridad

### Variables de Entorno (.env)
```env
PORT=5001
MONGODB_URI=mongodb+srv://datalex:datalex@servicioperron.g4uxjj6.mongodb.net/tacos-victius
JWT_SECRET=tacos_victius_jwt_secret_2025_super_seguro
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Mejores Prácticas Implementadas
- ✅ Passwords hasheados con bcrypt
- ✅ JWT para autenticación stateless
- ✅ Variables sensibles en .env
- ✅ CORS configurado
- ✅ Validación de datos
- ✅ Middleware de autenticación

---

## 📊 Base de Datos

### Colecciones

#### Products
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  available: Boolean,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admins
```javascript
{
  _id: ObjectId,
  username: String,
  password: String (hashed),
  name: String,
  role: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Productos Iniciales (8)
1. Tacos de Asada - $85.00
2. Tacos al Pastor - $80.00
3. Tlayuda Oaxaqueña - $120.00
4. Mezcal Artesanal - $65.00
5. Tacos de Chorizo - $75.00
6. Quesadillas Oaxaqueñas - $95.00
7. Agua de Horchata - $35.00
8. Memelas Oaxaqueñas - $70.00

---

## 🎨 Integración Frontend-Backend

### Flujo de Datos

```
Frontend (productos.html)
    ↓
assets/js/data/productos.js
    ↓
fetch('http://localhost:5001/api/products')
    ↓
Backend API (productRoutes.js)
    ↓
productController.getAllProducts()
    ↓
MongoDB Atlas
    ↓
Response JSON
    ↓
Frontend renderiza productos
```

### Ejemplo de Fetch

```javascript
// En productos.js
const response = await fetch('http://localhost:5001/api/products');
const data = await response.json();

if (data.success) {
    productos = data.data.map(producto => ({
        id: producto._id,
        name: producto.name,
        description: producto.description,
        price: producto.price,
        image: producto.image
    }));
}
```

---

## 🧪 Testing

### Probar API con cURL

```bash
# Obtener productos
curl http://localhost:5001/api/products

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Crear producto (requiere token)
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Tacos Nuevos","description":"Deliciosos","price":90,"image":"url","category":"Tacos"}'
```

### Probar en el Navegador

1. **Abrir DevTools** (F12)
2. **Console:**
```javascript
// Ver productos cargados
console.log(productos);

// Ver carrito
console.log(carrito);

// Probar API
fetch('http://localhost:5001/api/products')
  .then(r => r.json())
  .then(console.log);
```

---

## 📝 Comandos Útiles

### Backend

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo (auto-reload)
npm run dev

# Iniciar en producción
npm start

# Poblar base de datos
npm run seed

# Ver logs del servidor
# (el servidor muestra logs en consola)
```

### Frontend

```bash
# Servir con Live Server (VS Code)
# Click derecho en index.html → Open with Live Server

# O usar http-server
npx http-server -p 8080
```

---

## 🚢 Despliegue

### Backend (Railway/Render)

1. Crear repositorio Git
2. Push a GitHub
3. Conectar con Railway/Render
4. Configurar variables de entorno
5. Deploy automático

### Frontend (Netlify/Vercel)

1. Configurar CORS en backend para producción
2. Actualizar `API_URL` en `productos.js`
3. Deploy en Netlify/Vercel

---

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verificar que el puerto esté libre
netstat -ano | findstr :5001

# Cambiar puerto en .env si es necesario
PORT=5002
```

### No se conecta a MongoDB

1. Verificar credenciales en `.env`
2. Whitelist tu IP en MongoDB Atlas
3. Revisar connection string

### Productos no cargan en frontend

1. Verificar que el backend esté corriendo
2. Abrir DevTools → Network → ver errores CORS
3. Verificar `API_URL` en `productos.js`

### Error de CORS

```javascript
// En server.js, verificar:
app.use(cors());
```

---

## 📚 Tecnologías Usadas

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos
- **Bootstrap 5.3** - Framework UI
- **JavaScript ES6+** - Lógica
- **Leaflet.js** - Mapas
- **Google Sign-In** - Autenticación social
- **PayPal SDK** - Pagos
- **EmailJS** - Emails

### Backend
- **Node.js** v20.12.2 - Runtime
- **Express** 4.18 - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** 8.0 - ODM
- **JWT** - Autenticación
- **bcryptjs** - Hash de passwords
- **CORS** - Cross-origin
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reload

---

## 📈 Próximas Mejoras

- [ ] Sistema de categorías en frontend
- [ ] Filtros de productos
- [ ] Búsqueda de productos
- [ ] Paginación en productos
- [ ] Sistema de órdenes en backend
- [ ] Historial de pedidos
- [ ] Notificaciones en tiempo real
- [ ] Dashboard de estadísticas
- [ ] Múltiples roles de admin
- [ ] Subida de imágenes al servidor
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios y de integración

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisar logs del servidor** en la terminal
2. **Abrir DevTools** (F12) en el navegador
3. **Verificar que todo esté corriendo:**
   - Backend: http://localhost:5001/api/products
   - Frontend: archivo HTML abierto
4. **Revisar esta guía** completa

---

## 🎓 Recursos de Aprendizaje

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 👨‍💻 Autor

**Tacos Victius** - Proyecto educativo de aplicación web full-stack con Node.js y MongoDB.

---

## ✅ Checklist de Implementación

- [x] Frontend con HTML/CSS/JS modular
- [x] Catálogo de productos responsive
- [x] Carrito de compras funcional
- [x] Integración PayPal
- [x] Sistema de contacto con EmailJS
- [x] Mapa interactivo con Leaflet
- [x] Google Sign-In
- [x] Backend con Express.js
- [x] Conexión a MongoDB Atlas
- [x] API REST completa
- [x] Modelos Mongoose
- [x] Autenticación JWT
- [x] Admin Dashboard
- [x] CRUD de productos
- [x] Seed de base de datos
- [x] Documentación completa
- [x] Variables de entorno
- [x] Manejo de errores
- [x] CORS configurado
- [x] Integración frontend-backend

---

**¡Todo listo para usar! 🚀🌮**

**URLs importantes:**
- **Admin Dashboard:** http://localhost:5001/admin
- **API Products:** http://localhost:5001/api/products
- **Frontend:** Abre `index.html` en tu navegador

**Credenciales Admin:**
- Usuario: `admin`
- Contraseña: `admin123`
