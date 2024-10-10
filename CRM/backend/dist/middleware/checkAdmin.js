"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        next(); // Se o usuário é administrador, prossiga
    }
    else {
        res.status(403).json({
            message: "Acesso negado: somente administradores podem realizar esta ação",
        });
    }
};
exports.default = checkAdmin;
