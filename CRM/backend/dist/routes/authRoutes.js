"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
// Rota de Registro (Sign Up)
router.post("/signup", (0, asyncHandler_1.asyncHandler)((req, res) => (0, authController_1.signup)(req, res)));
// Rota de Login
router.post("/login", (0, asyncHandler_1.asyncHandler)((req, res) => (0, authController_1.login)(req, res)));
// Rota de teste
router.get("/test", (req, res) => {
    res.json({ message: "Rota de teste funcionando corretamente" });
});
exports.default = router;
