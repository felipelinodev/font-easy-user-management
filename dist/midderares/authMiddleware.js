"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const auth_1 = require("../services/auth");
function authMiddleware(req, res, next) {
    const token = req.cookies['font-easy-auth'];
    // const token = req.headers.authorization?.split(' ')[1]
    if (!token)
        return res.status(401).json({ error: 'Token não fornecido' });
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
