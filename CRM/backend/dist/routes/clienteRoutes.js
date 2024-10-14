"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController = __importStar(require("../controllers/clienteController"));
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
// Definir as rotas de CRUD para Clientes com asyncHandler
router.get("/", (0, asyncHandler_1.asyncHandler)(clienteController.getAllClientes));
router.post("/", (0, asyncHandler_1.asyncHandler)(clienteController.createCliente));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(clienteController.getClienteById));
router.put("/:id", (0, asyncHandler_1.asyncHandler)(clienteController.updateCliente));
router.delete("/:id", (0, asyncHandler_1.asyncHandler)(clienteController.deleteCliente));
// Rota para alterar a senha do cliente
router.put("/:id/alterar-senha", (0, asyncHandler_1.asyncHandler)(clienteController.updateClienteSenha));
exports.default = router;
