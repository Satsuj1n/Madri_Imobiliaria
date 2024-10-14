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
const imovelController = __importStar(require("../controllers/imovelController"));
const checkAdmin_1 = __importDefault(require("../middleware/checkAdmin"));
const auth_1 = __importDefault(require("../middleware/auth"));
const asyncHandler_1 = require("../utils/asyncHandler");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuração do multer para upload de arquivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Diretório para armazenar as imagens
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Renomeia o arquivo com timestamp
    },
});
const upload = (0, multer_1.default)({ storage }).fields([
    { name: "imagemPrincipal", maxCount: 1 },
    { name: "imagensSecundarias", maxCount: 5 },
]);
const router = express_1.default.Router();
// Rota para criar um novo imóvel com upload de imagens
router.post("/", auth_1.default, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Erro no upload de imagens" });
        }
        next();
    });
}, (0, asyncHandler_1.asyncHandler)((req, res) => imovelController.createImovel(req, res)));
// Rota para buscar um imóvel específico por ID
router.get("/:id", (0, asyncHandler_1.asyncHandler)((req, res) => imovelController.getImovelById(req, res)));
// Rota para atualizar um imóvel existente com upload de imagens
router.put("/:id", auth_1.default, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Erro no upload de imagens" });
        }
        next();
    });
}, (0, asyncHandler_1.asyncHandler)((req, res) => imovelController.updateImovel(req, res)));
// Rota para deletar um imóvel
router.delete("/:id", auth_1.default, (0, asyncHandler_1.asyncHandler)((req, res) => imovelController.deleteImovel(req, res)));
// Rota para o admin aprovar um imóvel e enviar para OLX/Zap
router.put("/:id/aprovar", auth_1.default, checkAdmin_1.default, (0, asyncHandler_1.asyncHandler)((req, res) => imovelController.aprovarImovel(req, res)));
exports.default = router;
