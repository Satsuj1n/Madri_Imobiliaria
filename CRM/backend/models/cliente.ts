import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface ICliente extends Document {
  cpfCnpj: string;
  nomeRazaoSocial: string;
  email: string;
  senha: string;
  telefone?: string;
  relacionamento?: "locador" | "locatário" | "proprietário" | "fiador" | "lead";
  isAdmin?: boolean;
  dataCadastro?: Date;
  comparePassword(senha: string): Promise<boolean>;
}

const ClienteSchema: Schema = new mongoose.Schema({
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
ClienteSchema.pre<ICliente>("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Comparar a senha fornecida com a senha hashada no banco de dados
ClienteSchema.methods.comparePassword = function (senha: string): Promise<boolean> {
  return bcrypt.compare(senha, this.senha);
};

export default mongoose.model<ICliente>("Cliente", ClienteSchema);
