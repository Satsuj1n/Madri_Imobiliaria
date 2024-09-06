const mongoose = require("mongoose");

// Definir o esquema de um Imóvel
const ImovelSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  valor: { type: Number, required: true },
  localizacao: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pendente", "aprovado"],
    default: "aprovado", // Todos os imóveis são automaticamente aprovados por enquanto
  },
});

// Exportar o modelo de Imóvel
module.exports = mongoose.model("Imovel", ImovelSchema);
