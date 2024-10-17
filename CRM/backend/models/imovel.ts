import mongoose, { Document, Schema } from "mongoose";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
}

export interface ImovelDocument extends Document {
  titulo: string;
  descricao?: string;
  localizacao: string;
  cep: number;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria:
    | "andar corrido"
    | "apartamento"
    | "área privativa"
    | "casa"
    | "chácara"
    | "cobertura"
    | "fazenda"
    | "flat"
    | "galpão"
    | "garagem"
    | "kitnet"
    | "loja"
    | "lote"
    | "lote em condomínio"
    | "prédio"
    | "sala"
    | "salão"
    | "sítio";
  cliente: Cliente;
  status: "pendente" | "aprovado";
  imagemPrincipal?: string;
  imagensSecundarias?: string[];
  IPTUAnual?: number;
  IPTUMensal?: number;
  aluguelValor?: number; // Preço de aluguel se "aluguel" for selecionado
  valor?: number; // Preço de venda se "venda" for selecionado

  // Novos campos adicionais
  numero?: string;
  bairro?: string;
  regiao?: string;
  subRegiao?: string;
  cidadeEstado?: string;
  finalidade?: string;
  tipoComplemento?: string;
  complemento?: string;
  torreBloco?: string;
  lazer?: string[];
  areaExterna?: number;
  areaLote?: number;
  metrosFrente?: number;
  metrosFundo?: number;
  metrosDireito?: number;
  metrosEsquerdo?: number;
  zonaUso?: string;
  coeficienteAproveitamento?: number;
}

const ImovelSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  localizacao: { type: String, required: true },
  cep: { type: Number, required: true },
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
    enum: [
      "andar corrido",
      "apartamento",
      "área privativa",
      "casa",
      "chácara",
      "cobertura",
      "fazenda",
      "flat",
      "galpão",
      "garagem",
      "kitnet",
      "loja",
      "lote",
      "lote em condomínio",
      "prédio",
      "sala",
      "salão",
      "sítio",
    ],
    required: true,
  },
  cliente: {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["pendente", "aprovado"],
    default: "pendente",
  },
  imagemPrincipal: { type: String },
  imagensSecundarias: [{ type: String }],

  IPTUAnual: { type: Number }, // IPTU anual opcional
  IPTUMensal: { type: Number }, // IPTU mensal opcional
  aluguelValor: { type: Number }, // Preço de aluguel, aplicável se tipo="aluguel"
  valor: { type: Number }, // Preço de venda, aplicável se tipo="venda"

  // Novos campos adicionais
  numero: { type: String },
  bairro: { type: String },
  regiao: { type: String },
  subRegiao: { type: String },
  cidadeEstado: { type: String },
  finalidade: { type: String },
  tipoComplemento: { type: String },
  complemento: { type: String },
  torreBloco: { type: String },
  lazer: [{ type: String }],
  areaExterna: { type: Number },
  areaLote: { type: Number },
  metrosFrente: { type: Number },
  metrosFundo: { type: Number },
  metrosDireito: { type: Number },
  metrosEsquerdo: { type: Number },
  zonaUso: { type: String },
  coeficienteAproveitamento: { type: Number },
});

export default mongoose.model<ImovelDocument>("Imovel", ImovelSchema);
