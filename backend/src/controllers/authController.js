// ==========================================
// CONTROLADOR DE AUTENTICACIÓN
// ==========================================

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generar JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token válido por 7 días
    });
};

// @desc    Login de administrador
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validar datos
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor proporciona usuario y contraseña'
            });
        }
        
        // Buscar admin
        const admin = await Admin.findOne({ username });
        
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }
        
        // Verificar contraseña
        const isMatch = await admin.matchPassword(password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }
        
        // Verificar si está activo
        if (!admin.active) {
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo'
            });
        }
        
        // Generar token
        const token = generateToken(admin._id);
        
        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

// @desc    Verificar token
// @route   GET /api/auth/verify
// @access  Private
exports.verifyToken = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin no encontrado'
            });
        }
        
        res.json({
            success: true,
            admin: {
                id: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar token',
            error: error.message
        });
    }
};

// @desc    Crear primer admin (solo para desarrollo)
// @route   POST /api/auth/create-admin
// @access  Public (cambiar a private en producción)
exports.createAdmin = async (req, res) => {
    try {
        const { username, password, name } = req.body;
        
        // Verificar si ya existe
        const existingAdmin = await Admin.findOne({ username });
        
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'El usuario ya existe'
            });
        }
        
        // Crear admin
        const admin = await Admin.create({
            username,
            password,
            name: name || 'Administrador'
        });
        
        const token = generateToken(admin._id);
        
        res.status(201).json({
            success: true,
            message: 'Admin creado exitosamente',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear admin',
            error: error.message
        });
    }
};
