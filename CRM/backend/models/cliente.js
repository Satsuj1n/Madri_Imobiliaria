const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir o esquema de um Cliente
const ClienteSchema = new mongoose.Schema({
  cpfCnpj: { type: String, required: true, unique: true },
  nomeRazaoSocial: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }, // Campo para senha
  telefone: { type: String, required: false },
  relacionamento: {
    type: String,
    enum: ["locador", "locatário", "proprietário", "fiador", "lead"],
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Por padrão, o cliente não é admin
  },
  dataCadastro: { type: Date, default: Date.now },
});

// Antes de salvar o cliente, hash a senha
ClienteSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Comparar a senha fornecida com a senha hashada no banco de dados
ClienteSchema.methods.comparePassword = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model("Cliente", ClienteSchema);
