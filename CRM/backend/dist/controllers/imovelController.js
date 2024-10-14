"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aprovarImovel = exports.deleteImovel = exports.updateImovel = exports.getImovelById = exports.createImovel = exports.getAllImoveis = void 0;
const imovel_1 = __importDefault(require("../models/imovel"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
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
// Função para listar todos os imóveis
const getAllImoveis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imoveis = yield imovel_1.default.find();
        res.json(imoveis);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar imóveis" });
    }
});
exports.getAllImoveis = getAllImoveis;
// Função para criar um novo imóvel
const createImovel = (req, res) => {
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({ error: "Erro no upload de imagens" });
            }
            // Verifica se req.files é do tipo objeto com campos como imagemPrincipal e imagensSecundarias
            const files = req.files;
            const { titulo, descricao, valor, localizacao, cep, area, quarto, banheiro, tipo, categoria, } = req.body;
            const novoImovel = new imovel_1.default({
                titulo,
                descricao,
                valor,
                localizacao,
                cep,
                area,
                quarto,
                banheiro,
                tipo,
                categoria,
                imagem: (files === null || files === void 0 ? void 0 : files["imagemPrincipal"])
                    ? files["imagemPrincipal"][0].filename
                    : undefined,
                imagens: (files === null || files === void 0 ? void 0 : files["imagensSecundarias"])
                    ? files["imagensSecundarias"].map((file) => file.filename)
                    : [],
            });
            try {
                const imovel = yield novoImovel.save();
                res.status(201).json(imovel);
            }
            catch (err) {
                res.status(500).json({ error: "Erro ao criar imóvel" });
            }
        });
    });
};
exports.createImovel = createImovel;
// Função para buscar um imóvel por ID
const getImovelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findById(req.params.id);
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json(imovel);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar imóvel" });
    }
});
exports.getImovelById = getImovelById;
// Função para atualizar um imóvel existente
const updateImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json(imovel);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao atualizar imóvel" });
    }
});
exports.updateImovel = updateImovel;
// Função para deletar um imóvel
const deleteImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndDelete(req.params.id);
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json({ message: "Imóvel deletado com sucesso" });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao deletar imóvel" });
    }
});
exports.deleteImovel = deleteImovel;
// Função para aprovar um imóvel (somente admins) e enviar o anúncio para OLX/Zap
const aprovarImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndUpdate(req.params.id, { status: "aprovado" }, { new: true });
        if (!imovel) {
            return res.status(404).json({ error: "Imóvel não encontrado" });
        }
        // Dados básicos para envio de leads
        const leadData = {
            LeadName: imovel.cliente.nome,
            LeadEmail: imovel.cliente.email,
            LeadTelephone: imovel.cliente.telefone,
            Message: `Anúncio aprovado para o imóvel: ${imovel.titulo}`,
            ExternalId: imovel._id,
            BrokerEmail: "seu_email@imobiliaria.com",
            LeadOrigin: "ImobiliariaSistema",
        };
        // Adicionar parâmetros específicos com base na categoria
        switch (imovel.categoria) {
            case "apartamentos":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1000; // Código para apartamentos
                break;
            case "casas":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1010; // Código para casas
                break;
            case "temporada":
                leadData.BusinessType = ["RENTAL"];
                leadData.category = 1030; // Código para temporada
                break;
            case "terrenos":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1040; // Código para terrenos
                break;
            case "comercio-industria":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1120; // Código para comércio e indústria
                break;
            default:
                return res.status(400).json({ error: "Categoria de imóvel inválida" });
        }
        // Enviar requisição para OLX/Zap
        const response = yield axios_1.default.post("https://crm-leadmanager-leadreceiver-api.gestao.prod.olxbr.io/v1/addLeads", leadData, {
            headers: {
                "X-API-KEY": process.env.OLX_API_KEY || "",
                "X-Agent-Name": process.env.OLX_AGENT_NAME || "",
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        res.status(200).json({
            message: "Imóvel aprovado e anúncio enviado para OLX/Zap",
            data: response.data,
        });
    }
    catch (err) {
        console.error("Erro ao aprovar imóvel ou enviar para OLX/Zap:", err.message);
        res
            .status(500)
            .json({ error: "Erro ao aprovar imóvel ou enviar para OLX/Zap" });
    }
});
exports.aprovarImovel = aprovarImovel;
module.exports = {
    getAllImoveis: exports.getAllImoveis,
    createImovel: exports.createImovel,
    getImovelById: exports.getImovelById,
    updateImovel: exports.updateImovel,
    deleteImovel: exports.deleteImovel,
    aprovarImovel: exports.aprovarImovel,
};
