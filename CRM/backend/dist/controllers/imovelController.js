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
exports.aprovarImovel = exports.adicionarImagens = exports.deleteImovel = exports.getAllImoveis = exports.updateImovel = exports.getImovelById = exports.createImovel = void 0;
const imovel_1 = __importDefault(require("../models/imovel"));
const cliente_1 = __importDefault(require("../models/cliente"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const s3Service_1 = require("../utils/s3Service"); // Adjust the path as necessary
// Função para criar um novo imóvel
const createImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        console.log("ID do cliente autenticado:", userId);
        if (!userId) {
            return res.status(401).json({ error: "Cliente não autenticado" });
        }
        const cliente = yield cliente_1.default.findById(userId);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        // Pega o restante das informações do corpo da requisição, incluindo as novas datas
        const { titulo, descricao, endereco, cep, area, quarto, banheiro, tipo, categoria, numero, bairro, regiao, subRegiao, cidadeEstado, finalidade, tipoComplemento, complemento, torreBloco, lazer, areaExterna, areaInterna, areaLote, metrosFrente, metrosFundo, metrosDireito, metrosEsquerdo, zonaUso, coeficienteAproveitamento, IPTUAnual, IPTUMensal, aluguelValor, valor, dataDisponivelInicio, // Novo campo
        dataDisponivelFim, // Novo campo
         } = req.body;
        console.log("Dados do imóvel recebidos:", {
            titulo,
            descricao,
            endereco,
            cep,
            area,
            quarto,
            banheiro,
            tipo,
            categoria,
            numero,
            bairro,
            regiao,
            subRegiao,
            cidadeEstado,
            finalidade,
            tipoComplemento,
            complemento,
            torreBloco,
            lazer,
            areaExterna,
            areaInterna,
            areaLote,
            metrosFrente,
            metrosFundo,
            metrosDireito,
            metrosEsquerdo,
            zonaUso,
            coeficienteAproveitamento,
            IPTUAnual,
            IPTUMensal,
            aluguelValor,
            valor,
            dataDisponivelInicio,
            dataDisponivelFim,
        });
        // Aqui você adiciona a lógica para lidar com o upload das imagens
        let imagemPrincipalUrl = "";
        let outrasImagensUrls = [];
        if (req.files && Array.isArray(req.files)) {
            const files = req.files;
            for (const file of files) {
                const s3Result = yield (0, s3Service_1.uploadFileToS3)(file); // Função para subir imagem ao S3
                if (file.fieldname === "imagemPrincipal") {
                    imagemPrincipalUrl = s3Result; // Salva o URL da imagem principal diretamente
                }
                else if (file.fieldname === "outrasImagens") {
                    outrasImagensUrls.push(s3Result); // Adiciona o URL das outras imagens
                }
            }
        }
        const novoImovel = new imovel_1.default({
            titulo,
            descricao,
            endereco,
            cep,
            area,
            quarto,
            banheiro,
            tipo,
            categoria,
            cliente: {
                nome: cliente.nomeRazaoSocial,
                email: cliente.email,
                telefone: cliente.telefone,
            },
            status: "pendente",
            numero,
            bairro,
            regiao,
            subRegiao,
            cidadeEstado,
            finalidade,
            tipoComplemento,
            complemento,
            torreBloco,
            lazer,
            areaExterna,
            areaInterna,
            areaLote,
            metrosFrente,
            metrosFundo,
            metrosDireito,
            metrosEsquerdo,
            zonaUso,
            coeficienteAproveitamento,
            IPTUAnual,
            IPTUMensal,
            aluguelValor: tipo === "aluguel" ? aluguelValor : undefined,
            valor: tipo === "venda" ? valor : undefined,
            imagemPrincipal: imagemPrincipalUrl, // Armazena o URL da imagem principal
            outrasImagens: outrasImagensUrls, // Armazena os URLs das outras imagens
            // Inclui os novos campos de data
            dataDisponivelInicio: dataDisponivelInicio
                ? new Date(dataDisponivelInicio)
                : undefined,
            dataDisponivelFim: dataDisponivelFim
                ? new Date(dataDisponivelFim)
                : undefined,
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
const adicionarImagens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const imovel = yield imovel_1.default.findById(id);
        if (!imovel) {
            return res.status(404).json({ error: "Imóvel não encontrado" });
        }
        let imagemPrincipalUrl = "";
        let outrasImagensUrls = [];
        // Processa o upload das imagens
        if (req.files) {
            const files = req.files;
            // Verifica a imagem principal
            if (files.imagemPrincipal && files.imagemPrincipal[0]) {
                imagemPrincipalUrl = yield (0, s3Service_1.uploadFileToS3)(files.imagemPrincipal[0]);
            }
            // Verifica outras imagens
            if (files.outrasImagens) {
                for (const file of files.outrasImagens) {
                    const s3Result = yield (0, s3Service_1.uploadFileToS3)(file);
                    outrasImagensUrls.push(s3Result);
                }
            }
        }
        // Atualiza o imóvel com os URLs das imagens
        imovel.imagemPrincipal = imagemPrincipalUrl || imovel.imagemPrincipal;
        imovel.outrasImagens = [
            ...(imovel.outrasImagens || []),
            ...outrasImagensUrls,
        ];
        yield imovel.save();
        return res.status(200).json({
            message: "Imagens adicionadas com sucesso",
            imovel,
        });
    }
    catch (err) {
        console.error("Erro ao adicionar imagens:", err);
        return res.status(500).json({ error: "Erro ao adicionar imagens" });
    }
});
exports.adicionarImagens = adicionarImagens;
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
        // Adicionar parâmetros específicos com base na nova categoria
        switch (imovel.categoria) {
            case "andar corrido":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2000;
                break;
            case "apartamento":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1000;
                break;
            case "área privativa":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2010;
                break;
            case "casa":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1010;
                break;
            case "chácara":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2020;
                break;
            case "cobertura":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2030;
                break;
            case "fazenda":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2040;
                break;
            case "flat":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2050;
                break;
            case "galpão":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2060;
                break;
            case "garagem":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2070;
                break;
            case "kitnet":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2080;
                break;
            case "loja":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2090;
                break;
            case "lote":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2100;
                break;
            case "lote em condomínio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2110;
                break;
            case "prédio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2120;
                break;
            case "sala":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2130;
                break;
            case "salão":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2140;
                break;
            case "sítio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2150;
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
    adicionarImagens: exports.adicionarImagens,
    getAllImoveis: exports.getAllImoveis,
    createImovel: exports.createImovel,
    getImovelById: exports.getImovelById,
    updateImovel: exports.updateImovel,
    deleteImovel: exports.deleteImovel,
    aprovarImovel: exports.aprovarImovel,
};
