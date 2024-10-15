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
exports.aprovarImovel = exports.deleteImovel = exports.getAllImoveis = exports.updateImovel = exports.getImovelById = exports.createImovel = void 0;
const imovel_1 = __importDefault(require("../models/imovel"));
const cliente_1 = __importDefault(require("../models/cliente"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
// Configuração do multer para upload de arquivos (opcional)
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
// Função para criar um novo imóvel
const createImovel = (req, res) => {
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.log("Erro no upload de imagens:", err);
                return res.status(500).json({ error: "Erro no upload de imagens" });
            }
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Obtém o token JWT da requisição
                if (!token) {
                    return res.status(401).json({ error: "Token não fornecido" });
                }
                // Decodifica o token para pegar o ID do cliente
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const userId = decoded.id; // Recupera o ID do cliente autenticado do payload do token
                console.log("ID do cliente autenticado:", userId);
                if (!userId) {
                    return res.status(401).json({ error: "Cliente não autenticado" });
                }
                // Busca os dados completos do cliente pelo ID do token
                const cliente = yield cliente_1.default.findById(userId);
                if (!cliente) {
                    console.log("Cliente não encontrado.");
                    return res.status(404).json({ error: "Cliente não encontrado" });
                }
                // Dados do imóvel recebidos do corpo da requisição
                const { titulo, descricao, valor, localizacao, cep, area, quarto, banheiro, tipo, categoria, } = req.body;
                // Criar o novo imóvel com os dados do cliente incluídos
                const files = req.files;
                console.log("Dados do imóvel:", {
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
                });
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
                    cliente: {
                        nome: cliente.nomeRazaoSocial, // Dados completos do cliente
                        email: cliente.email,
                        telefone: cliente.telefone,
                    },
                    status: "pendente", // Imóvel começa como "pendente"
                    imagem: (files === null || files === void 0 ? void 0 : files["imagemPrincipal"])
                        ? files["imagemPrincipal"][0].filename
                        : undefined, // Imagem principal é opcional
                    imagens: (files === null || files === void 0 ? void 0 : files["imagensSecundarias"])
                        ? files["imagensSecundarias"].map((file) => file.filename)
                        : [], // Imagens secundárias são opcionais
                });
                console.log("Novo imóvel a ser criado:", novoImovel);
                const imovel = yield novoImovel.save();
                console.log("Imóvel criado com sucesso:", imovel);
                return res.status(201).json(imovel);
            }
            catch (err) {
                console.error("Erro ao criar imóvel:", err);
                return res.status(500).json({ error: "Erro ao criar imóvel" });
            }
        });
    });
};
exports.createImovel = createImovel;
// Outras funções do controller permanecem inalteradas
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
