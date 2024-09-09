const mongoose = require("mongoose");

// Definir o esquema de um Imóvel
const ImovelSchema = new mongoose.Schema({
  titulo: { type: String, required: true }, // Título do imóvel (nome do anúncio)
  descricao: { type: String }, // Descrição do imóvel
  valor: { type: Number, required: true }, // Valor do imóvel
  localizacao: { type: String, required: true }, // Localização (endereço do imóvel)
  area: { type: Number, required: true }, // Área em m²
  tipo: {
    type: String,
    enum: ["venda", "aluguel"], // Tipo de transação (venda ou aluguel)
    required: true,
  },
  categoria: {
    type: String,
    enum: ["apartamentos", "casas", "temporada", "terrenos", "comercio-industria"], // Categorias da OLX
    required: true,
  },
  cliente: {
    // Cliente associado ao imóvel (quem está vendendo ou alugando)
    nome: { type: String, required: true }, // Nome do cliente (LeadName)
    email: { type: String, required: true }, // Email do cliente (LeadEmail)
    telefone: { type: String, required: true }, // Telefone do cliente (LeadTelephone)
  },
  message: { type: String }, // Mensagem do cliente (LeadMessage)
  status: {
    type: String,
    enum: ["pendente", "aprovado"],
    default: "pendente", // Status do imóvel (aguardando aprovação)
  },
  clientListingId: { type: String }, // Identificador do anúncio para o cliente
  originLeadId: { type: String }, // Identificador da origem do lead (fornecido pela OLX/Zap)
  temperaturaLead: {
    type: String,
    enum: ["baixa", "media", "alta"], // Temperatura do lead (interesse do cliente)
  },
  dataCadastro: { type: Date, default: Date.now }, // Data de cadastro do imóvel
});

// Exportar o modelo de Imóvel
module.exports = mongoose.model("Imovel", ImovelSchema);
