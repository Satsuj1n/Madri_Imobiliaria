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
exports.login = exports.signup = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Função de Registro com bcrypt habilitado no modelo
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha, nomeRazaoSocial, cpfCnpj, telefone, relacionamento } = req.body;
    console.log("Recebendo requisição de signup com os seguintes dados:", req.body);
    try {
        // Verificar se o usuário já existe
        let cliente = yield cliente_1.default.findOne({ email });
        if (cliente) {
            console.log(`Usuário com o email ${email} já existe.`);
            return res.status(400).json({ message: "Usuário já existe" });
        }
        // Criação de um novo usuário, o hash será aplicado automaticamente pelo mongoose
        cliente = new cliente_1.default({
            email,
            senha, // O hash será aplicado automaticamente pelo hook no modelo
            nomeRazaoSocial,
            cpfCnpj,
            telefone,
            relacionamento,
            isAdmin: false,
        });
        console.log("Cliente criado com sucesso, prestes a salvar no banco de dados:", cliente);
        // Salvar o cliente no banco de dados
        yield cliente.save();
        console.log("Cliente salvo com sucesso no banco de dados");
        return res.status(201).json({ message: "Usuário registrado com sucesso" });
    }
    catch (err) {
        console.error("Erro ao registrar o usuário:", err);
        return res.status(500).json({ message: "Erro no registro. Por favor, tente novamente." });
    }
});
exports.signup = signup;
// Função de Login com validação de senha usando bcrypt
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    console.log("Tentativa de login com email:", email);
    try {
        const cliente = yield cliente_1.default.findOne({ email });
        if (!cliente) {
            console.log("Usuário não encontrado com o email:", email);
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        // Use o método comparePassword do modelo para verificar a senha
        const isMatch = yield cliente.comparePassword(senha);
        if (!isMatch) {
            console.log("Senha incorreta fornecida para o email:", email);
            return res.status(400).json({ message: "Senha incorreta" });
        }
        // Geração do token JWT
        const payload = {
            id: cliente._id,
            isAdmin: cliente.isAdmin,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("Login bem-sucedido para o email:", email);
        console.log("Token gerado:", token);
        return res.json({ token: `Bearer ${token}` });
    }
    catch (err) {
        console.error("Erro no login:", err);
        return res.status(500).json({ message: "Erro no login" });
    }
});
exports.login = login;
