"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CondominioSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: true },
    tipoCondominio: { type: String, required: true },
    construtora: { type: String },
    areaLoteTerreno: { type: Number },
    cidade: { type: String, required: true },
    bairro: { type: String },
    endereco: { type: String, required: true },
    numero: { type: String },
    caracteristicasExtrasCondominio: { type: [String] },
    caracteristicasExtrasImovel: { type: [String] },
    dataCadastro: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Condominio", CondominioSchema);
