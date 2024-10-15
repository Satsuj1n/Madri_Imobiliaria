import { Request, Response } from "express";
import Imovel from "../models/imovel";
import Cliente from "../models/cliente";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import axios from "axios";

// Configuração do multer para upload de arquivos (opcional)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório para armazenar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com timestamp
  },
});

const upload = multer({ storage }).fields([
  { name: "imagemPrincipal", maxCount: 1 },
  { name: "imagensSecundarias", maxCount: 5 },
]);

// Função para criar um novo imóvel
export const createImovel = (req: Request, res: Response) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log("Erro no upload de imagens:", err);
      return res.status(500).json({ error: "Erro no upload de imagens" });
    }

    try {
      const token = req.headers.authorization?.split(" ")[1]; // Obtém o token JWT da requisição
      if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
      }

      // Decodifica o token para pegar o ID do cliente
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const userId = decoded.id; // Recupera o ID do cliente autenticado do payload do token
      console.log("ID do cliente autenticado:", userId);
      if (!userId) {
        return res.status(401).json({ error: "Cliente não autenticado" });
      }

      // Busca os dados completos do cliente pelo ID do token
      const cliente = await Cliente.findById(userId);
      if (!cliente) {
        console.log("Cliente não encontrado.");
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      // Dados do imóvel recebidos do corpo da requisição
      const {
        titulo,
        descricao,
        valor,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
      } = req.body;

      // Criar o novo imóvel com os dados do cliente incluídos
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      console.log("Dados do imóvel:", {
        titulo,
        descricao,
        valor,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
      });

      const novoImovel = new Imovel({
        titulo,
        descricao,
        valor,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
        cliente: {
          nome: cliente.nomeRazaoSocial, // Dados completos do cliente
          email: cliente.email,
          telefone: cliente.telefone,
        },
        status: "pendente", // Imóvel começa como "pendente"
        imagem: files?.["imagemPrincipal"]
          ? files["imagemPrincipal"][0].filename
          : undefined, // Imagem principal é opcional
        imagens: files?.["imagensSecundarias"]
          ? files["imagensSecundarias"].map((file) => file.filename)
          : [], // Imagens secundárias são opcionais
      });

      console.log("Novo imóvel a ser criado:", novoImovel);

      const imovel = await novoImovel.save();
      console.log("Imóvel criado com sucesso:", imovel);

      return res.status(201).json(imovel);
    } catch (err) {
      console.error("Erro ao criar imóvel:", err);
      return res.status(500).json({ error: "Erro ao criar imóvel" });
    }
  });
};

// Outras funções do controller permanecem inalteradas

export const getImovelById = async (req: Request, res: Response) => {
  try {
    const imovel = await Imovel.findById(req.params.id);
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imóvel" });
  }
};

export const updateImovel = async (req: Request, res: Response) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar imóvel" });
  }
};

export const getAllImoveis = async (req: Request, res: Response) => {
  try {
    const imoveis = await Imovel.find();
    res.json(imoveis);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imóveis" });
  }
};

export const deleteImovel = async (req: Request, res: Response) => {
  try {
    const imovel = await Imovel.findByIdAndDelete(req.params.id);
    if (!imovel)
      return res.status(404).json({ error: "Imóvel não encontrado" });
    res.json({ message: "Imóvel deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar imóvel" });
  }
};

export const aprovarImovel = async (req: Request, res: Response) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(
      req.params.id,
      { status: "aprovado" },
      { new: true }
    );
    if (!imovel) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }

    // Dados básicos para envio de leads
    const leadData: Record<string, any> = {
      LeadName: imovel.cliente.nome,
      LeadEmail: imovel.cliente.email,
      LeadTelephone: imovel.cliente.telefone,
      Message: `Anúncio aprovado para o imóvel: ${imovel.titulo}`,
      ExternalId: imovel._id,
      BrokerEmail: "seu_email@imobiliaria.com",
      LeadOrigin: "ImobiliariaSistema",
    };

    // Adicionar parâmetros específicos com base na categoria
    switch (imovel.categoria) {
      case "apartamentos":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1000; // Código para apartamentos
        break;
      case "casas":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1010; // Código para casas
        break;
      case "temporada":
        leadData.BusinessType = ["RENTAL"];
        leadData.category = 1030; // Código para temporada
        break;
      case "terrenos":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1040; // Código para terrenos
        break;
      case "comercio-industria":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1120; // Código para comércio e indústria
        break;
      default:
        return res.status(400).json({ error: "Categoria de imóvel inválida" });
    }

    // Enviar requisição para OLX/Zap
    const response = await axios.post(
      "https://crm-leadmanager-leadreceiver-api.gestao.prod.olxbr.io/v1/addLeads",
      leadData,
      {
        headers: {
          "X-API-KEY": process.env.OLX_API_KEY || "",
          "X-Agent-Name": process.env.OLX_AGENT_NAME || "",
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "Imóvel aprovado e anúncio enviado para OLX/Zap",
      data: response.data,
    });
  } catch (err: any) {
    console.error(
      "Erro ao aprovar imóvel ou enviar para OLX/Zap:",
      err.message
    );
    res
      .status(500)
      .json({ error: "Erro ao aprovar imóvel ou enviar para OLX/Zap" });
  }
};

module.exports = {
  getAllImoveis,
  createImovel,
  getImovelById,
  updateImovel,
  deleteImovel,
  aprovarImovel,
};
