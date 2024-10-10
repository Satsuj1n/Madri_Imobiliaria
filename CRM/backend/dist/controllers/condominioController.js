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
exports.deleteCondominio = exports.updateCondominio = exports.getCondominioById = exports.createCondominio = exports.getAllCondominios = void 0;
const condominio_1 = __importDefault(require("../models/condominio"));
// Função para buscar todos os condomínios
const getAllCondominios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condominios = yield condominio_1.default.find();
        return res.json(condominios);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar condomínios" });
    }
});
exports.getAllCondominios = getAllCondominios;
// Função para criar um novo condomínio
const createCondominio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, tipoCondominio, construtora, areaLoteTerreno, cidade, bairro, endereco, numero, caracteristicasExtrasCondominio, caracteristicasExtrasImovel, } = req.body;
    const novoCondominio = new condominio_1.default({
        nome,
        tipoCondominio,
        construtora,
        areaLoteTerreno,
        cidade,
        bairro,
        endereco,
        numero,
        caracteristicasExtrasCondominio,
        caracteristicasExtrasImovel,
    });
    try {
        const condominio = yield novoCondominio.save();
        return res.status(201).json(condominio);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao criar condomínio" });
    }
});
exports.createCondominio = createCondominio;
// Função para buscar um condomínio pelo ID
const getCondominioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condominio = yield condominio_1.default.findById(req.params.id);
        if (!condominio)
            return res.status(404).json({ error: "Condomínio não encontrado" });
        return res.json(condominio);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar condomínio" });
    }
});
exports.getCondominioById = getCondominioById;
// Função para atualizar um condomínio
const updateCondominio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condominio = yield condominio_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!condominio)
            return res.status(404).json({ error: "Condomínio não encontrado" });
        return res.json(condominio);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar condomínio" });
    }
});
exports.updateCondominio = updateCondominio;
// Função para deletar um condomínio
const deleteCondominio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condominio = yield condominio_1.default.findByIdAndDelete(req.params.id);
        if (!condominio)
            return res.status(404).json({ error: "Condomínio não encontrado" });
        return res.json({ message: "Condomínio deletado com sucesso" });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao deletar condomínio" });
    }
});
exports.deleteCondominio = deleteCondominio;
