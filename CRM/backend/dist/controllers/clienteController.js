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
exports.deleteCliente = exports.updateCliente = exports.getClienteById = exports.createCliente = exports.getAllClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
// Função para buscar todos os clientes
const getAllClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield cliente_1.default.find();
        return res.json(clientes);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar clientes" });
    }
});
exports.getAllClientes = getAllClientes;
// Função para criar um novo cliente
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cpfCnpj, nomeRazaoSocial, email, telefone, relacionamento, senha } = req.body;
        // Verificar se o cliente já existe
        let cliente = yield cliente_1.default.findOne({ cpfCnpj });
        if (cliente) {
            return res.status(400).json({ message: "Cliente já existe" });
        }
        // Criar um novo cliente
        cliente = new cliente_1.default({
            cpfCnpj,
            nomeRazaoSocial,
            email,
            telefone,
            relacionamento,
            senha,
        });
        yield cliente.save();
        return res.status(201).json({ message: "Cliente criado com sucesso", cliente });
    }
    catch (err) {
        console.error("Erro ao criar cliente:", err);
        return res.status(500).json({ error: "Erro ao criar cliente" });
    }
});
exports.createCliente = createCliente;
// Função para buscar um cliente pelo ID
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield cliente_1.default.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        return res.json(cliente);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar cliente" });
    }
});
exports.getClienteById = getClienteById;
// Função para atualizar um cliente
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield cliente_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!cliente) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        return res.json(cliente);
    }
    catch (err) {
        console.error("Erro ao atualizar cliente:", err); // Loga o erro completo no servidor
        if (err.code === 11000) {
            return res.status(400).json({ error: "cpf/CNPJ ou Código já existente" });
        }
        else {
            return res.status(500).json({ error: "Erro ao atualizar cliente" });
        }
    }
});
exports.updateCliente = updateCliente;
// Função para deletar um cliente
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield cliente_1.default.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        return res.json({ message: "Cliente deletado com sucesso" });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao deletar cliente" });
    }
});
exports.deleteCliente = deleteCliente;
