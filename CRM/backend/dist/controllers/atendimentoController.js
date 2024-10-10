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
exports.deleteAtendimento = exports.updateAtendimento = exports.getAtendimentoById = exports.createAtendimento = exports.getAllAtendimentos = void 0;
const atendimento_1 = __importDefault(require("../models/atendimento"));
const asyncHandler_1 = require("../utils/asyncHandler");
// Função para buscar todos os atendimentos
exports.getAllAtendimentos = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const atendimentos = yield atendimento_1.default.find()
        .populate("cliente")
        .populate("imovel")
        .populate("condominio");
    res.json(atendimentos);
}));
// Função para criar um novo atendimento
exports.createAtendimento = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cliente, imovel, condominio, dataAtendimento, status, tipoAtendimento, observacoes, responsavelAtendimento } = req.body;
    const novoAtendimento = new atendimento_1.default({
        cliente,
        imovel,
        condominio,
        dataAtendimento,
        status,
        tipoAtendimento,
        observacoes,
        responsavelAtendimento,
    });
    const atendimento = yield novoAtendimento.save();
    res.status(201).json(atendimento);
}));
// Função para buscar um atendimento pelo ID
exports.getAtendimentoById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const atendimento = yield atendimento_1.default.findById(req.params.id)
        .populate("cliente")
        .populate("imovel")
        .populate("condominio");
    if (!atendimento) {
        res.status(404).json({ error: "Atendimento não encontrado" });
        return;
    }
    res.json(atendimento);
}));
// Função para atualizar um atendimento
exports.updateAtendimento = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const atendimento = yield atendimento_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atendimento) {
        res.status(404).json({ error: "Atendimento não encontrado" });
        return;
    }
    res.json(atendimento);
}));
// Função para deletar um atendimento
exports.deleteAtendimento = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const atendimento = yield atendimento_1.default.findByIdAndDelete(req.params.id);
    if (!atendimento) {
        res.status(404).json({ error: "Atendimento não encontrado" });
        return;
    }
    res.json({ message: "Atendimento deletado com sucesso" });
}));
