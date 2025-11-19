# 📝 Post-Deploy Checklist

## Después de hacer deploy en Render, necesitas:

### ✅ 1. Configurar Google OAuth (IMPORTANTE)

1. Ve a: https://console.cloud.google.com/apis/credentials
2. Busca tu Client ID
3. Click en editar
4. En **"Authorized JavaScript origins"** agrega tu URL de Render:
   ```
   https://tu-app-name.onrender.com
   ```
5. **Guarda** los cambios
6. Espera 5 minutos para que se aplique

---

### ✅ 2. Poblar Base de Datos (Primera vez)

En Render:
1. Ve a tu servicio
2. Click en **"Shell"** (pestaña superior)
3. Ejecuta:
   ```bash
   npm run seed
   ```

Esto creará:
- 8 productos iniciales
- Usuario admin (admin / admin123)

---

### ✅ 3. Verificar MongoDB Atlas

1. Ve a: https://cloud.mongodb.com/
2. **Network Access** → **Add IP Address**
3. Selecciona: **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **Confirm**

---

## 🧪 Probar que todo funcione

Reemplaza `TU-APP` con tu URL de Render:

```
✅ Inicio:          https://TU-APP.onrender.com/
✅ Productos:       https://TU-APP.onrender.com/productos
✅ Admin:           https://TU-APP.onrender.com/admin
✅ API:             https://TU-APP.onrender.com/api/products
```

**Credenciales Admin:**
- Usuario: `admin`
- Password: `admin123`

---

## 📋 Resumen de lo que YA está listo:

✅ Código actualizado con API URLs dinámicas
✅ Funciona automáticamente en local y producción
✅ No necesitas cambiar URLs manualmente
✅ Listo para push a GitHub

---

## 🚀 Siguiente paso:

```bash
# Sube los cambios
git add .
git commit -m "Update: Dynamic API URLs for production"
git push

# Luego ve a Render y crea el Web Service
```
