"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
// Middleware para autenticar usando JWT sem sessão
const auth = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Anexa o usuário ao req se a autenticação for bem-sucedida
        req.user = user; // Especifica o tipo para garantir que o TypeScript compreenda
        next();
    })(req, res, next);
};
exports.default = auth;
