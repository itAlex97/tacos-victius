# 🔧 Solución: Admin no logea en producción

## Problema:
El usuario admin no existe en la base de datos de producción.

## Solución:

### Opción 1: Ejecutar seed desde Render Shell (Recomendado)

1. **Ve a tu servicio en Render**
2. Click en la pestaña **"Shell"** (arriba a la derecha)
3. Espera que se abra la terminal
4. Ejecuta:
   ```bash
   npm run seed
   ```
5. Deberías ver:
   ```
   ✅ Conectado a MongoDB
   🗑️  Colecciones limpiadas
   📦 Productos insertados: 8
   👨‍💼 Admin creado: admin
   ```

### Opción 2: Crear admin desde el endpoint

1. **Abre en el navegador:**
   ```
   https://TU-DOMINIO.onrender.com/api/auth/create-admin
   ```
   
2. O usa este código en la consola del navegador (F12):
   ```javascript
   fetch('https://TU-DOMINIO.onrender.com/api/auth/create-admin', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           username: 'admin',
           password: 'admin123',
           name: 'Administrador Principal'
       })
   })
   .then(r => r.json())
   .then(console.log);
   ```

### Opción 3: Verificar que MongoDB Atlas permita conexiones

1. Ve a: https://cloud.mongodb.com/
2. **Network Access** → **IP Access List**
3. Asegúrate que esté: **0.0.0.0/0** (Allow access from anywhere)
4. Si no está, agrégalo:
   - Click **"Add IP Address"**
   - Selecciona **"Allow Access from Anywhere"**
   - Click **"Confirm"**

---

## ⚠️ IMPORTANTE: Deshabilitar create-admin en producción

Después de crear el admin, comenta esta ruta en `authRoutes.js`:

```javascript
// ⚠️ SOLO PARA DESARROLLO - Comentar en producción
// router.post('/create-admin', createAdmin);
```

---

## 🧪 Verificar que funcionó:

1. Ve a: `https://TU-DOMINIO.onrender.com/admin`
2. Login con:
   - Usuario: `admin`
   - Password: `admin123`

---

**Ejecuta el seed desde Render Shell y me avisas si funciona** ✅
