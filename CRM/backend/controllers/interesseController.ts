import { Request, Response } from "express";
import Interesse from "../models/interesse"; // Ajuste o caminho do modelo
import { UserRequest } from "../middleware/types"; // Tipo que inclui o `req.user`


export const salvarInteresse = async (req: UserRequest, res: Response) => {
  try {
    console.log("Iniciando salvarInteresse...");
    console.log("Dados recebidos no body:", req.body);

    const { idImovel, tituloImovel, nomeCliente, telefoneCliente, emailCliente } = req.body;

    // Verifica se o `req.user` está presente
    if (!req.user) {
      console.error("Usuário não autenticado.");
      return res.status(401).json({ message: "Cliente não autenticado" });
    }

    // Verifica se os dados obrigatórios foram fornecidos
    if (!nomeCliente || !telefoneCliente || !emailCliente) {
      console.error("Dados obrigatórios ausentes no body da requisição.");
      return res.status(400).json({
        message: "Os campos nomeCliente, telefoneCliente e emailCliente são obrigatórios.",
      });
    }

    // Extrai o ID do usuário autenticado
    const userId = (req.user as any)._id; // Acessa o `_id` diretamente
    console.log("ID do usuário autenticado:", userId);

    // Cria um novo interesse
    const novoInteresse = new Interesse({
      idImovel,
      tituloImovel,
      nomeCliente,
      telefoneCliente,
      emailCliente,
      idDoCliente: userId, // ID do cliente autenticado
    });

    console.log("Novo interesse criado:", novoInteresse);

    // Salva o interesse no banco de dados
    await novoInteresse.save();
    console.log("Interesse salvo com sucesso no banco de dados:", novoInteresse);

    return res.status(201).json({
      message: "Interesse salvo com sucesso",
      novoInteresse,
    });
  } catch (error) {
    console.error("Erro ao salvar interesse:", error);
    return res.status(500).json({ error: "Erro interno ao salvar interesse" });
  }
};

// Buscar todos os interesses
export const getInteresses = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const interesses = await Interesse.find();
    res.json(interesses);
  } catch (error) {
    console.error("Erro ao buscar os interesses:", error);
    res.status(500).json({ error: "Erro ao buscar interesses" });
  }
};
