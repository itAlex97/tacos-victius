# 🚀 Deploy de Tacos Victius

## Opción 1: Render (Recomendado - Gratis)

### Pasos para Deploy:

1. **Crear cuenta en Render**
   - Ve a: https://render.com/
   - Sign up con GitHub

2. **Subir proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Tacos Victius"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/tacos-victius.git
   git push -u origin main
   ```

3. **Crear Web Service en Render**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Configura:
     - **Name:** tacos-victius
     - **Root Directory:** `backend`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

4. **Agregar Variables de Entorno**
   En el dashboard de Render, ve a "Environment" y agrega:
   ```
   MONGODB_URI=mongodb+srv://datalex:datalex@servicioperron.g4uxjj6.mongodb.net/tacos-victius?retryWrites=true&w=majority
   JWT_SECRET=tacos_victius_jwt_secret_2025_super_seguro
   NODE_ENV=production
   PORT=10000
   ```

5. **Deploy**
   - Click en "Create Web Service"
   - Espera 3-5 minutos
   - Tu app estará en: `https://tacos-victius.onrender.com`

6. **Actualizar URLs del Frontend**
   - En `assets/js/data/productos.js`, cambia:
   ```javascript
   const API_URL = 'https://tacos-victius.onrender.com/api';
   ```
   - En `backend/public/admin.js`, cambia:
   ```javascript
   const API_URL = 'https://tacos-victius.onrender.com/api';
   ```

7. **Actualizar Google OAuth**
   - Ve a Google Cloud Console
   - Agrega a "Authorized JavaScript origins":
   ```
   https://tacos-victius.onrender.com
   ```

---

## Opción 2: Railway (También gratis)

### Pasos:

1. **Crear cuenta:** https://railway.app/
2. **New Project** → "Deploy from GitHub repo"
3. **Selecciona tu repo**
4. **Configura variables de entorno** (igual que Render)
5. **Deploy automático**

---

## Opción 3: Vercel (Para backend Node.js)

### Pasos:

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Crear vercel.json en la raíz:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "backend/src/server.js"
       }
     ]
   }
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

---

## Configuración de MongoDB Atlas para Producción

1. **Ve a MongoDB Atlas:** https://cloud.mongodb.com/
2. **Network Access** → "Add IP Address"
3. **Selecciona:** "Allow Access from Anywhere" (0.0.0.0/0)
4. **Database Access** → Verifica que el usuario `datalex` tenga permisos

---

## Comandos Git para Subir a GitHub

```bash
# Si no tienes Git configurado
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Deploy: Tacos Victius Full Stack"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU_USUARIO/tacos-victius.git

# Subir código
git push -u origin main
```

---

## URLs Finales (ejemplo con Render)

- **🌐 Aplicación:** https://tacos-victius.onrender.com/
- **🌮 Productos:** https://tacos-victius.onrender.com/productos
- **👨‍💼 Admin:** https://tacos-victius.onrender.com/admin
- **📍 API:** https://tacos-victius.onrender.com/api

---

## ⚠️ Notas Importantes

1. **Primera carga en Render es lenta** (30-60 segundos) - el servicio gratuito se "duerme"
2. **MongoDB Atlas debe permitir conexiones** desde cualquier IP
3. **Actualizar todas las URLs** en el código después del deploy
4. **Google OAuth necesita** el nuevo dominio autorizado

---

## ✅ Checklist Post-Deploy

- [ ] Servidor desplegado y corriendo
- [ ] MongoDB conectado correctamente
- [ ] Ejecutar seed en producción (si es necesario)
- [ ] URLs actualizadas en frontend
- [ ] Google OAuth configurado con nuevo dominio
- [ ] Probar login de admin
- [ ] Probar carga de productos
- [ ] Probar CRUD desde admin dashboard

---

**Recomendación:** Usa **Render** porque es el más simple y tiene tier gratuito permanente.
