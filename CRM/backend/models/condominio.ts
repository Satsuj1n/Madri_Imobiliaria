import mongoose, { Document, Schema } from "mongoose";

export interface CondominioDocument extends Document {
  nome: string;
  tipoCondominio: string;
  construtora?: string;
  areaLoteTerreno?: number;
  cidade: string;
  bairro?: string;
  endereco: string;
  numero?: string;
  caracteristicasExtrasCondominio?: string[];
  caracteristicasExtrasImovel?: string[];
  dataCadastro: Date;
}

const CondominioSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipoCondominio: { type: String, required: true },
  construtora: { type: String },
  areaLoteTerreno: { type: Number },
  cidade: { type: String, required: true },
  bairro: { type: String },
  endereco: { type: String, required: true },
  numero: { type: String },
  caracteristicasExtrasCondominio: { type: [String] },
  caracteristicasExtrasImovel: { type: [String] },
  dataCadastro: { type: Date, default: Date.now },
});

export default mongoose.model<CondominioDocument>("Condominio", CondominioSchema);
