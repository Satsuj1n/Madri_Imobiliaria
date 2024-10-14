import mongoose, { Document, Schema } from "mongoose";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
}

export interface ImovelDocument extends Document {
  titulo: string;
  descricao?: string;
  valor: number;
  localizacao: string;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria: "apartamentos" | "casas" | "temporada" | "terrenos" | "comercio-industria";
  cliente: Cliente;
  message?: string;
  status: "pendente" | "aprovado";
  clientListingId?: string;
  originLeadId?: string;
  temperaturaLead?: "baixa" | "media" | "alta";
  dataCadastro: Date;
  imagem?: string;
  imagens?: string[];
}

const ImovelSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  valor: { type: Number, required: true },
  localizacao: { type: String, required: true },
  area: { type: Number, required: true },
  quarto: { type: Number },
  banheiro: { type: Number },
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
  imagem: { type: String },
  imagens: [{ type: String }],
});

export default mongoose.model<ImovelDocument>("Imovel", ImovelSchema);
