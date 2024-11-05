import { Request, Response } from "express";
import Cliente from "../models/cliente";
import nodemailer from "nodemailer";


export const sendRecoveryEmail = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email } = req.body;
    console.log("E-mail recebido para recuperação:", email);

    // Verificar se o cliente existe
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      console.log("Cliente não encontrado com o e-mail:", email);
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Gerar um código OTP aleatório
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP gerado:", otp);

    // Configurar o transportador do Nodemailer para Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar o conteúdo do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de Recuperação de Senha",
      text: `Seu código de recuperação de senha é: ${otp}`,
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso para:", email);

    // Enviar o OTP de volta para o frontend
    res.status(200).json({ message: "Email de recuperação enviado com sucesso", otp });
    console.log("OTP enviado ao frontend:", otp); // Confirmar que o OTP está sendo enviado
  } catch (err) {
    console.error("Erro ao enviar e-mail de recuperação:", err);
    res.status(500).json({ error: "Erro ao enviar e-mail de recuperação" });
  }
};
// Função para buscar todos os clientes
export const getAllClientes = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const clientes = await Cliente.find();
    return res.json(clientes);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar clientes" });
  }
};

// Função para redefinir a senha com base no e-mail
export const redefinirSenha = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, novaSenha } = req.body;

    // Buscar cliente pelo e-mail
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Atualizar a senha do cliente
    cliente.senha = novaSenha;
    await cliente.save();

    return res.json({ message: "Senha redefinida com sucesso" });
  } catch (err: any) {
    console.error("Erro ao redefinir senha:", err);
    return res.status(500).json({ error: "Erro ao redefinir senha" });
  }
};


// Função para criar um novo cliente
export const createCliente = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { cpfCnpj, nomeRazaoSocial, email, telefone, relacionamento, senha } =
      req.body;

    // Verificar se o cliente já existe
    let cliente = await Cliente.findOne({ cpfCnpj });
    if (cliente) {
      return res.status(400).json({ message: "Cliente já existe" });
    }

    // Criar um novo cliente
    cliente = new Cliente({
      cpfCnpj,
      nomeRazaoSocial,
      email,
      telefone,
      relacionamento,
      senha,
    });

    await cliente.save();
    return res
      .status(201)
      .json({ message: "Cliente criado com sucesso", cliente });
  } catch (err) {
    console.error("Erro ao criar cliente:", err);
    return res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

// Função para buscar um cliente pelo ID
export const getClienteById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.json(cliente);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};

// Função para atualizar um cliente
export const updateCliente = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.json(cliente);
  } catch (err: any) {
    console.error("Erro ao atualizar cliente:", err); // Loga o erro completo no servidor
    if (err.code === 11000) {
      return res.status(400).json({ error: "cpf/CNPJ ou Código já existente" });
    } else {
      return res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
  }
};

// Função para deletar um cliente
export const deleteCliente = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar cliente" });
  }
};

export const updateClienteSenha = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { senhaAtual, novaSenha } = req.body;

    // Buscar cliente pelo ID
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Verificar se a senha atual está correta
    const isMatch = await cliente.comparePassword(senhaAtual);
    if (!isMatch) {
      return res.status(400).json({ error: "Senha atual incorreta" });
    }

    // Atualizar com a nova senha
    cliente.senha = novaSenha;

    // Salvar o cliente com a nova senha
    await cliente.save();

    return res.json({ message: "Senha alterada com sucesso" });
  } catch (err: any) {
    console.error("Erro ao alterar senha:", err);
    return res.status(500).json({ error: "Erro ao alterar senha" });
  }
};
