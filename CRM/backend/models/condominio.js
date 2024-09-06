const mongoose = require("mongoose");

// Definir o esquema de um Condomínio
const CondominioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipoCondominio: { type: String, required: true },
  construtora: { type: String, required: false },
  areaLoteTerreno: { type: Number, required: false },
  cidade: { type: String, required: true },
  bairro: { type: String, required: false },
  endereco: { type: String, required: true },
  numero: { type: String, required: false },
  caracteristicasExtrasCondominio: { type: [String], required: false },
  caracteristicasExtrasImovel: { type: [String], required: false },
  dataCadastro: { type: Date, default: Date.now },
});

// Exportar o modelo de Condomínio
module.exports = mongoose.model("Condominio", CondominioSchema);
