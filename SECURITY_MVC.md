# 🔐 Arquitectura MVC Segura - Tacos Victius

## 📋 Resumen

Todas las credenciales sensibles han sido movidas al backend. El frontend **ya no expone** ninguna clave API, secreto o credencial.

---

## 🏗️ Arquitectura Implementada

### **Patrón MVC (Model-View-Controller)**

```
Frontend (View)          →  Backend (Controller)  →  Servicios Externos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
assets/js/modules/       →  controllers/          →  Google OAuth
- contact.js                - contactController     →  Nodemailer (Gmail)
- auth.js                   - oauthController       →  PayPal API
- checkout.js               - paypalController      
```

---

## 🔒 Seguridad Implementada

### ❌ ANTES (Inseguro)

```javascript
// assets/js/config.js (EXPUESTO AL PÚBLICO)
const CONFIG = {
    GOOGLE_CLIENT_ID: '779089677765-5nskol629j4fpa35l9n184o181sbkkgj.apps.googleusercontent.com',
    EMAILJS: {
        SERVICE_ID: 'service_y8j6oxr',
        PUBLIC_KEY: 'aMX4zYtId4JgUHYBF'
    },
    PAYPAL_CLIENT_ID: 'AZn954yotacFl2oUYB8bnGwE0WoD2eizkFEjsRUdtdfNVxq9fnXjou8DpjkxAxfbtUBJ8mZFlTIxRKQU'
};
```

**Problema:** Cualquiera puede ver las credenciales en el navegador.

---

### ✅ AHORA (Seguro)

```javascript
// assets/js/config.js (SOLO DATOS PÚBLICOS)
const CONFIG = {
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5001/api' 
        : `${window.location.origin}/api`,
    
    UBICACION: { /* datos públicos */ }
};

// Credenciales obtenidas dinámicamente del backend
await fetch(`${CONFIG.API_URL}/oauth/google/client-id`);
await fetch(`${CONFIG.API_URL}/paypal/client-id`);
```

```env
# backend/.env (NUNCA SE SUBE A GITHUB)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...
```

**Solución:** Las credenciales están en el servidor, protegidas por variables de entorno.

---

## 📡 Nuevas APIs Creadas

### 1. **Contacto (Email)**

**Endpoint:** `POST /api/contact`

**Frontend:**
```javascript
// assets/js/modules/contact.js
await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nombre: '...',
        email: '...',
        mensaje: '...'
    })
});
```

**Backend:**
```javascript
// controllers/contactController.js
const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // 🔒 Protegido
            pass: process.env.EMAIL_PASS   // 🔒 Protegido
        }
    });
    // ...
};
```

---

### 2. **Google Sign-In**

**Endpoint:** `POST /api/oauth/google`

**Frontend:**
```javascript
// assets/js/modules/auth.js
async function handleCredentialResponse(response) {
    const verifyResponse = await fetch(`${API_URL}/oauth/google`, {
        method: 'POST',
        body: JSON.stringify({ credential: response.credential })
    });
    
    const data = await verifyResponse.json();
    // Recibe: { success, user, token }
}
```

**Backend:**
```javascript
// controllers/oauthController.js
const { OAuth2Client } = require('google-auth-library');

exports.verifyGoogleToken = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID  // 🔒 Protegido
    });
    
    // Retorna datos del usuario + JWT propio
};
```

---

### 3. **PayPal Checkout**

**Endpoints:**
- `POST /api/paypal/create-order`
- `POST /api/paypal/capture-order`
- `GET /api/paypal/client-id`

**Frontend:**
```javascript
// assets/js/pages/checkout.js
paypal.Buttons({
    createOrder: async function() {
        const response = await fetch(`${API_URL}/paypal/create-order`, {
            method: 'POST',
            body: JSON.stringify({ items, total })
        });
        
        const data = await response.json();
        return data.orderId;
    },
    onApprove: async function(data) {
        await fetch(`${API_URL}/paypal/capture-order`, {
            method: 'POST',
            body: JSON.stringify({ orderId: data.orderID })
        });
    }
});
```

**Backend:**
```javascript
// controllers/paypalController.js
const axios = require('axios');

exports.createOrder = async (req, res) => {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`  // 🔒 Protegido
    ).toString('base64');
    
    const response = await axios.post(
        'https://api-m.paypal.com/v2/checkout/orders',
        orderData,
        { headers: { 'Authorization': `Basic ${auth}` } }
    );
    // ...
};
```

---

## 🛠️ Configuración Requerida

### 1. Variables de Entorno

Crea/actualiza `backend/.env`:

```env
# Email (Gmail)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_de_gmail
EMAIL_RECIPIENT=restaurante@tacosvictius.com

# Google OAuth
GOOGLE_CLIENT_ID=779089677765-5nskol629j4fpa35l9n184o181sbkkgj.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...

# PayPal
PAYPAL_CLIENT_ID=AZn954yotacFl2oUYB8bnGwE0WoD2eizkFEjsRUdtdfNVxq9fnXjou8DpjkxAxfbtUBJ8mZFlTIxRKQU
PAYPAL_SECRET=tu_paypal_secret

# Frontend URL
FRONTEND_URL=http://localhost:5001
```

### 2. Configurar Gmail para Nodemailer

1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa **verificación en 2 pasos**
3. Ve a **Contraseñas de aplicaciones**
4. Genera una contraseña para "Correo" → "Otro (nombre personalizado)"
5. Copia el password de 16 caracteres y úsalo en `EMAIL_PASS`

### 3. PayPal Secret

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Selecciona tu app
3. Copia el **Secret** (junto al Client ID)
4. Pégalo en `PAYPAL_SECRET`

### 4. Google Client Secret

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Credentials → OAuth 2.0 Client IDs
3. Copia el **Client secret**
4. Pégalo en `GOOGLE_CLIENT_SECRET`

---

## 🧪 Testing

### 1. Test Email Configuration

```bash
curl http://localhost:5001/api/contact/test
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Configuración de email correcta ✅",
  "config": {
    "user": "tu_email@gmail.com",
    "hasPassword": true
  }
}
```

### 2. Test Contact Form

```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "mensaje": "Mensaje de prueba"
  }'
```

### 3. Test Google OAuth

```bash
curl http://localhost:5001/api/oauth/google/client-id
```

Respuesta:
```json
{
  "success": true,
  "clientId": "779089677765-..."
}
```

### 4. Test PayPal Client ID

```bash
curl http://localhost:5001/api/paypal/client-id
```

Respuesta:
```json
{
  "success": true,
  "clientId": "AZn954yotacFl2o...",
  "currency": "MXN"
}
```

---

## 📁 Archivos Modificados

### Backend (Nuevos)
- ✅ `src/controllers/contactController.js`
- ✅ `src/controllers/oauthController.js`
- ✅ `src/controllers/paypalController.js`
- ✅ `src/routes/contactRoutes.js`
- ✅ `src/routes/oauthRoutes.js`
- ✅ `src/routes/paypalRoutes.js`

### Backend (Actualizados)
- ✅ `src/server.js` - Registrar nuevas rutas
- ✅ `package.json` - Nuevas dependencias
- ✅ `.env` - Todas las credenciales

### Frontend (Actualizados)
- ✅ `assets/js/config.js` - **Credenciales removidas**
- ✅ `assets/js/modules/contact.js` - Usar API backend
- ✅ `assets/js/modules/auth.js` - Usar API backend
- ✅ `assets/js/pages/checkout.js` - Usar API backend

---

## 🚀 Deploy a Render

### Actualizar variables de entorno en Render:

1. Ve a tu servicio en https://render.com/
2. Environment → Add Environment Variable
3. Agregar:

```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_16_chars
EMAIL_RECIPIENT=restaurante@tacosvictius.com
GOOGLE_CLIENT_ID=779089677765-...
GOOGLE_CLIENT_SECRET=GOCSPX-...
PAYPAL_CLIENT_ID=AZn954yotacFl2o...
PAYPAL_SECRET=tu_paypal_secret
FRONTEND_URL=https://tacos-victius.onrender.com
NODE_ENV=production
```

4. Click "Save Changes" → Automatic redeploy

---

## ✅ Beneficios de esta Arquitectura

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Seguridad** | ❌ Credenciales expuestas | ✅ Protegidas en servidor |
| **Control** | ❌ Cliente puede manipular | ✅ Validación server-side |
| **Auditoría** | ❌ No hay logs | ✅ Logs centralizados |
| **Escalabilidad** | ❌ Limitado | ✅ Preparado para crecer |
| **Mantenimiento** | ❌ Difícil cambiar APIs | ✅ Cambios centralizados |

---

## 📖 Referencias

- [Nodemailer Documentation](https://nodemailer.com/)
- [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
- [PayPal REST API](https://developer.paypal.com/api/rest/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**¡Ahora tu aplicación es segura y profesional! 🔒🌮**
