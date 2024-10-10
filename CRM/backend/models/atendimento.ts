import mongoose, { Document, Schema } from "mongoose";

// Interface para o modelo de Atendimento
export interface IAtendimento extends Document {
  cliente: mongoose.Schema.Types.ObjectId;
  imovel?: mongoose.Schema.Types.ObjectId;
  condominio?: mongoose.Schema.Types.ObjectId;
  dataAtendimento: Date;
  status: "aberto" | "em andamento" | "concluído";
  tipoAtendimento: "Visita" | "Chamado técnico" | "Consulta";
  observacoes?: string;
  responsavelAtendimento?: string;
  dataCadastro: Date;
}

// Definir o esquema de Atendimento
const AtendimentoSchema = new Schema<IAtendimento>({
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
  imovel: { type: Schema.Types.ObjectId, ref: "Imovel" },
  condominio: { type: Schema.Types.ObjectId, ref: "Condominio" },
  dataAtendimento: { type: Date, required: true },
  status: { type: String, enum: ["aberto", "em andamento", "concluído"], default: "aberto" },
  tipoAtendimento: { type: String, enum: ["Visita", "Chamado técnico", "Consulta"], required: true },
  observacoes: { type: String },
  responsavelAtendimento: { type: String },
  dataCadastro: { type: Date, default: Date.now },
});

// Exportar o modelo de Atendimento
const Atendimento = mongoose.model<IAtendimento>("Atendimento", AtendimentoSchema);
export default Atendimento;
