const mongoose = require("mongoose");

const ImovelSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  valor: { type: Number, required: true },
  localizacao: { type: String, required: true },
  area: { type: Number, required: true },
  quarto: { type: Number, required: false },
  banheiro: { type: Number, required: false },
  tipo: {
    type: String,
    enum: ["venda", "aluguel"],
    required: true,
  },
  categoria: {
    type: String,
    enum: ["apartamentos", "casas", "temporada", "terrenos", "comercio-industria"],
    required: true,
  },
  cliente: {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
  },
  message: { type: String },
  status: {
    type: String,
    enum: ["pendente", "aprovado"],
    default: "pendente",
  },
  clientListingId: { type: String },
  originLeadId: { type: String },
  temperaturaLead: {
    type: String,
    enum: ["baixa", "media", "alta"],
  },
  dataCadastro: { type: Date, default: Date.now },
  imagem: { type: String }, // Campo para uma única imagem
  // Ou, se você quiser armazenar várias imagens, use um array de strings
  imagens: [{ type: String }], // Campo para múltiplas imagens
});

module.exports = mongoose.model("Imovel", ImovelSchema);
