import mongoose, { Document, Schema } from "mongoose";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
}

export interface ImovelDocument extends Document {
  titulo: string;
  situacao?: string;
  descricao?: string;
  endereco: string;
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
  IPTUAnual?: number;
  IPTUMensal?: number;
  aluguelValor?: number; // Preço de aluguel se "aluguel" for selecionado
  valor?: number; // Preço de venda se "venda" for selecionado
  numero?: string;
  bairro?: string;
  regiao?: string;
  subRegiao?: string;
  cidadeEstado?: string;
  tipoComplemento?: string;
  complemento?: string;
  torreBloco?: string;
  lazer?: string[];
  areaExterna?: number;
  areaInterna?: number;
  metrosFrente?: number;
  metrosFundo?: number;
  metrosDireito?: number;
  metrosEsquerdo?: number;
  zonaUso?: string;
  coeficienteAproveitamento?: number;

  imagemPrincipal?: string; // URL da imagem principal
  outrasImagens?: string[]; // Array com URLs das imagens adicionais
}

const ImovelSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  situacao: { type: String, enum: ["disponivel", "ocupado"] },
  descricao: { type: String },
  endereco: { type: String, required: true },
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

  IPTUAnual: { type: Number },
  IPTUMensal: { type: Number },
  aluguelValor: { type: Number },
  valor: { type: Number },

  // Novos campos
  numero: { type: String },
  bairro: { type: String },
  regiao: { type: String },
  subRegiao: { type: String },
  cidadeEstado: { type: String },
  tipoComplemento: { type: String },
  complemento: { type: String },
  torreBloco: { type: String },
  lazer: [{ type: String }],
  areaExterna: { type: Number },
  areaInterna: { type: Number },
  metrosFrente: { type: Number },
  metrosFundo: { type: Number },
  metrosDireito: { type: Number },
  metrosEsquerdo: { type: Number },
  zonaUso: { type: String },
  coeficienteAproveitamento: { type: Number },

  // Campos para imagens
  imagemPrincipal: { type: String }, // URL da imagem principal
  outrasImagens: { type: [String] }, // Array de URLs de imagens adicionais
});

export default mongoose.model<ImovelDocument>("Imovel", ImovelSchema);
