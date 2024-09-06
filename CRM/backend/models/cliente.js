const mongoose = require("mongoose");

// Definir o esquema de um Cliente
const ClienteSchema = new mongoose.Schema({
  cpfCnpj: { type: String, required: true, unique: true },
  codigo: { type: String, required: true, unique: true },
  nomeRazaoSocial: { type: String, required: true },
  email: { type: String, required: false },
  telefone: { type: String, required: false },
  relacionamento: {
    type: String,
    enum: ["locador", "locatário", "proprietário", "fiador", "lead"],
    required: false,
  },
  // Campo booleano que define se o usuário é admin ou não
  isAdmin: {
    type: Boolean,
    default: false, // Por padrão, o cliente não é admin
  },
  dataCadastro: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cliente", ClienteSchema);
