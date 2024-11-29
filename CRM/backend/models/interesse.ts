import mongoose, { Schema, Document } from "mongoose";

export interface IInteresse extends Document {
  idImovel: string;
  tituloImovel: string;
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  idDoCliente: mongoose.Schema.Types.ObjectId;
  dataInteresse?: Date;
}

const InteresseSchema: Schema = new Schema(
  {
    idImovel: { type: String, required: true },
    tituloImovel: { type: String, required: true },
    nomeCliente: { type: String, required: true },
    telefoneCliente: { type: String, required: true },
    emailCliente: { type: String, required: true },
    idDoCliente: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dataInteresse: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IInteresse>("Interesse", InteresseSchema);
