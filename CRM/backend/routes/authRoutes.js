const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

// Rota de Registro (Sign Up)
router.post("/signup", async (req, res) => {
  const { email, senha, nomeRazaoSocial, cpfCnpj, telefone, relacionamento } =
    req.body;

  try {
    // Verificar se o usuário já existe
    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criar um novo usuário
    cliente = new Cliente({
      email,
      senha,
      nomeRazaoSocial,
      cpfCnpj,
      telefone,
      relacionamento,
      isAdmin: false, // Sempre será false no registro
    });

    // Salvar o usuário no banco de dados
    await cliente.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no registro" });
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await cliente.comparePassword(senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // Geração do token JWT
    const payload = {
      id: cliente._id,
      isAdmin: cliente.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expira em 1 hora
    });

    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    res.status(500).json({ message: "Erro no login" });
  }
});

// Rota de teste
router.get("/test", (req, res) => {
  res.json({ message: "Rota de teste funcionando corretamente" });
});

module.exports = router;
