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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ClienteSchema = new mongoose_1.default.Schema({
    cpfCnpj: { type: String, required: true, unique: true },
    nomeRazaoSocial: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String },
    relacionamento: {
        type: String,
        enum: ["locador", "locatário", "proprietário", "fiador"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    dataCadastro: { type: Date, default: Date.now },
});
// Antes de salvar o cliente, hash a senha
ClienteSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("senha")) {
            return next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.senha = yield bcryptjs_1.default.hash(this.senha, salt);
        next();
    });
});
// Comparar a senha fornecida com a senha hashada no banco de dados
ClienteSchema.methods.comparePassword = function (senha) {
    return bcryptjs_1.default.compare(senha, this.senha);
};
exports.default = mongoose_1.default.model("Cliente", ClienteSchema);
