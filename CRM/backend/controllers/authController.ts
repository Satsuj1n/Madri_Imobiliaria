import { Request, Response } from "express";
import Cliente from "../models/cliente";
import jwt from "jsonwebtoken";

// Função de Registro com bcrypt habilitado no modelo
export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, senha, nomeRazaoSocial, cpfCnpj, telefone, relacionamento } =
    req.body;

  console.log(
    "Recebendo requisição de signup com os seguintes dados:",
    req.body
  );

  try {
    // Verificar se o usuário já existe
    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      console.log(`Usuário com o email ${email} já existe.`);
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criação de um novo usuário, o hash será aplicado automaticamente pelo mongoose
    cliente = new Cliente({
      email,
      senha, // O hash será aplicado automaticamente pelo hook no modelo
      nomeRazaoSocial,
      cpfCnpj,
      telefone,
      relacionamento,
      isAdmin: false,
    });

    console.log(
      "Cliente criado com sucesso, prestes a salvar no banco de dados:",
      cliente
    );

    // Salvar o cliente no banco de dados
    await cliente.save();

    console.log("Cliente salvo com sucesso no banco de dados");

    return res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error("Erro ao registrar o usuário:", err);
    return res
      .status(500)
      .json({ message: "Erro no registro. Por favor, tente novamente." });
  }
};

// Função de Login com validação de senha usando bcrypt
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body;

  console.log("Tentativa de login com email:", email);

  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      console.log("Usuário não encontrado com o email:", email);
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Use o método comparePassword do modelo para verificar a senha
    const isMatch = await cliente.comparePassword(senha);
    if (!isMatch) {
      console.log("Senha incorreta fornecida para o email:", email);
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // Geração do token JWT
    const payload = {
      id: cliente._id,
      isAdmin: cliente.isAdmin,
      email: cliente.email,
      nome: cliente.nomeRazaoSocial,
      telefone: cliente.telefone,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    console.log("Login bem-sucedido para o email:", email);
    console.log("Token gerado:", token);

    return res.json({ token: `Bearer ${token}` });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro no login" });
  }
};
