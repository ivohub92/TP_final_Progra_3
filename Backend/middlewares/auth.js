const jwt = require('jsonwebtoken');

// Middleware para verificar el token
exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Si viene como "Bearer token123"

    if (!token) return res.status(401).json({ error: 'Acceso denegado. No token proporcionado.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // Queda disponible para middlewares y controladores
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

// Middleware para verificar si el usuario es admin- Para API
exports.esAdmin = (req, res, next) => {
    if (!req.admin || req.admin.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
    }
    next();
};

