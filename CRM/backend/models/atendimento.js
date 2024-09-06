const mongoose = require("mongoose");

// Definir o esquema de Atendimento
const AtendimentoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  imovel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imovel",
    required: false,
  },
  condominio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Condominio",
    required: false,
  },
  dataAtendimento: { type: Date, required: true },
  status: {
    type: String,
    enum: ["aberto", "em andamento", "concluído"],
    default: "aberto",
    required: true,
  },
  tipoAtendimento: {
    type: String,
    enum: ["Visita", "Chamado técnico", "Consulta"],
    required: true,
  },
  observacoes: { type: String, required: false },
  responsavelAtendimento: { type: String, required: false },
  dataCadastro: { type: Date, default: Date.now },
});

// Exportar o modelo de Atendimento
module.exports = mongoose.model("Atendimento", AtendimentoSchema);
