// ==========================================
// MIDDLEWARE DE AUTENTICACIÓN
// ==========================================

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
    let token;
    
    // Verificar si el token viene en el header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    // Verificar que el token existe
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado, no hay token'
        });
    }
    
    try {
        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Obtener admin del token
        req.admin = await Admin.findById(decoded.id).select('-password');
        
        if (!req.admin) {
            return res.status(401).json({
                success: false,
                message: 'Admin no encontrado'
            });
        }
        
        if (!req.admin.active) {
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo'
            });
        }
        
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado, token inválido',
            error: error.message
        });
    }
};
