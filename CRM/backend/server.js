require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Adicionando CORS
const passport = require("passport");
const imovelRoutes = require("./routes/imovelRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const condominioRoutes = require("./routes/condominioRoutes");
const atendimentoRoutes = require("./routes/atendimentoRoutes");
const authRoutes = require("./routes/authRoutes"); // Rotas de autenticação

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());

// Middleware para habilitar CORS e permitir comunicações cross-origin
app.use(cors());

// Inicializar o Passport
app.use(passport.initialize());
require("./config/passport")(passport); // Configurar Passport para JWT

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
