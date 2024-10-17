import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import imovelRoutes from "./routes/imovelRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import condominioRoutes from "./routes/condominioRoutes";
import atendimentoRoutes from "./routes/atendimentoRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para analisar o corpo das requisições em JSON
// Middleware para aumentar o limite de tamanho de upload
app.use(express.json({ limit: "10mb" })); // Para requisições JSON
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Para requisições URL-encoded

// Middleware para habilitar CORS e permitir comunicações cross-origin
app.use(cors());

// Inicializar o Passport
app.use(passport.initialize());
import passportConfig from "./config/passport";
passportConfig(passport); // Configurar Passport para JWT

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Conectado ao MongoDB Atlas com sucesso"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Usar as rotas de autenticação
app.use("/api/auth", authRoutes);

// Usar as rotas de Imóveis
app.use("/api/imoveis", imovelRoutes);

// Usar as rotas de Atendimentos
app.use("/api/atendimentos", atendimentoRoutes);

// Usar as rotas de Clientes
app.use("/api/clientes", clienteRoutes);

// Usar as rotas de Condomínios
app.use("/api/condominios", condominioRoutes);

// Rota principal
app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
