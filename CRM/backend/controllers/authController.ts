import { Request, Response } from "express";
import Cliente from "../models/cliente";
import jwt from "jsonwebtoken";

export const getUserDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("Iniciando `getUserDetails`...");

    // Obtenha o token do cabeçalho da requisição
    let token = req.headers.authorization;
    console.log("Cabeçalho de autorização recebido:", token);

    if (!token) {
      console.warn("Token não foi fornecido no cabeçalho.");
      return res.status(401).json({ message: "Token não fornecido" });
    }

    // Corrige casos de duplicação do prefixo 'Bearer'
    if (token.startsWith("Bearer Bearer")) {
      token = token.replace("Bearer Bearer ", "");
    } else if (token.startsWith("Bearer")) {
      token = token.replace("Bearer ", "");
    }

    console.log("Token após correção:", token);

    // Verifique se o token é válido após a correção
    if (!token) {
      console.warn("Token inválido após a correção.");
      return res.status(401).json({ message: "Token inválido após correção" });
    }

    // Verifique e decodifique o token
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;
      console.log("Token decodificado com sucesso:", decoded);

      // Encontre o cliente pelo ID extraído do token
      const cliente = await Cliente.findById(decoded.id);

      if (!cliente) {
        console.warn("Cliente não encontrado no banco de dados:", decoded.id);
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      console.log("Cliente encontrado no banco de dados:", cliente);

      // Retorne os detalhes do cliente
      return res.status(200).json({
        id: cliente._id,
        email: cliente.email,
        nomeRazaoSocial: cliente.nomeRazaoSocial,
        telefone: cliente.telefone,
        relacionamento: cliente.relacionamento,
      });
    } catch (verifyErr) {
      console.error("Erro na validação do token JWT:", verifyErr);
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  } catch (err) {
    console.error("Erro ao obter os detalhes do cliente:", err);
    return res
      .status(500)
      .json({ message: "Erro ao obter os detalhes do cliente" });
  }
};



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
