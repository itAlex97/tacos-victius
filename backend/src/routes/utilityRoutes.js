// ==========================================
// RUTAS UTILITARIAS (Operaciones sensibles)
// ==========================================

const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/utils/send-email
 * @desc    Enviar email de contacto (sin exponer EmailJS)
 * @access  Public
 */
router.post('/send-email', async (req, res) => {
    try {
        const { from_name, reply_to, message } = req.body;

        // Validación básica
        if (!from_name || !reply_to || !message) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        // Aquí usarías Nodemailer o mantendrías EmailJS
        // Pero las credenciales estarían en variables de entorno
        const nodeFetch = await import('node-fetch');
        const fetch = nodeFetch.default;
        
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: process.env.EMAILJS_SERVICE_ID,
                template_id: process.env.EMAILJS_TEMPLATE_ID,
                user_id: process.env.EMAILJS_PUBLIC_KEY,
                template_params: {
                    from_name,
                    reply_to,
                    message
                }
            })
        });

        if (response.ok) {
            res.json({ success: true, message: 'Email enviado correctamente' });
        } else {
            res.status(500).json({ success: false, message: 'Error al enviar email' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

/**
 * @route   GET /api/utils/config
 * @desc    Obtener solo configuración pública (Client IDs)
 * @access  Public
 */
router.get('/config', (req, res) => {
    res.json({
        success: true,
        config: {
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            paypalClientId: process.env.PAYPAL_CLIENT_ID,
            ubicacion: {
                lat: 17.0794699,
                lng: -96.7064197,
                nombre: 'Tacos Victius',
                direccion: 'Av. Fuerza Aérea Mexicana, Antiguo Aeropuerto, 68050 Oaxaca de Juárez, Oax.'
            }
        }
    });
});

module.exports = router;
