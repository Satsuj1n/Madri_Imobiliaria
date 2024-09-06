require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB sem as opções deprecadas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB Atlas com sucesso"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.get("/", (req, res) => {
  res.send("API está funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
