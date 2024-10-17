import { Request, Response } from "express";
import Imovel from "../models/imovel";
import Cliente from "../models/cliente";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";
import axios from "axios";

// Configuração do multer para upload de arquivos (opcional)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "..", "uploads");

    // Verificar se a pasta 'uploads' existe, se não, criá-la
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Caminho absoluto para a pasta uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com timestamp
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Permite o upload se for uma imagem
    } else {
      cb(null, false); // Rejeita o arquivo se não for uma imagem
      return cb(
        new Error("Formato de arquivo inválido. Apenas imagens são permitidas.")
      );
    }
  },
}).fields([
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
      console.log("Início da criação do imóvel...");
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const userId = decoded.id;
      console.log("ID do cliente autenticado:", userId);
      if (!userId) {
        return res.status(401).json({ error: "Cliente não autenticado" });
      }

      const cliente = await Cliente.findById(userId);
      if (!cliente) {
        console.log("Cliente não encontrado.");
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      console.log("Cliente autenticado:", cliente);

      const {
        titulo,
        descricao,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
        numero,
        bairro,
        regiao,
        subRegiao,
        cidadeEstado,
        finalidade,
        tipoComplemento,
        complemento,
        torreBloco,
        lazer,
        areaExterna,
        areaLote,
        metrosFrente,
        metrosFundo,
        metrosDireito,
        metrosEsquerdo,
        zonaUso,
        coeficienteAproveitamento,
        IPTUAnual,
        IPTUMensal,
        aluguelValor,
        valor,
      } = req.body;

      console.log("Dados recebidos do formulário:", req.body);

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const imagemPrincipal = files?.imagemPrincipal
        ? files["imagemPrincipal"][0].filename
        : undefined;
      const imagensSecundarias = files?.imagensSecundarias
        ? files["imagensSecundarias"].map((file) => file.filename)
        : [];

      console.log("Arquivos recebidos:", files);

      console.log("Dados do imóvel:", {
        titulo,
        descricao,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
        numero,
        bairro,
        regiao,
        subRegiao,
        cidadeEstado,
        finalidade,
        tipoComplemento,
        complemento,
        torreBloco,
        lazer,
        areaExterna,
        areaLote,
        metrosFrente,
        metrosFundo,
        metrosDireito,
        metrosEsquerdo,
        zonaUso,
        coeficienteAproveitamento,
        IPTUAnual,
        IPTUMensal,
        aluguelValor,
        valor,
        imagemPrincipal,
        imagensSecundarias,
      });

      const novoImovel = new Imovel({
        titulo,
        descricao,
        localizacao,
        cep,
        area,
        quarto,
        banheiro,
        tipo,
        categoria,
        cliente: {
          nome: cliente.nomeRazaoSocial,
          email: cliente.email,
          telefone: cliente.telefone,
        },
        status: "pendente",
        imagemPrincipal: files?.["imagemPrincipal"]
          ? files["imagemPrincipal"][0].filename
          : undefined,
        imagensSecundarias: files?.["imagensSecundarias"]
          ? files["imagensSecundarias"].map((file) => file.filename)
          : [],
        numero,
        bairro,
        regiao,
        subRegiao,
        cidadeEstado,
        finalidade,
        tipoComplemento,
        complemento,
        torreBloco,
        lazer,
        areaExterna,
        areaLote,
        metrosFrente,
        metrosFundo,
        metrosDireito,
        metrosEsquerdo,
        zonaUso,
        coeficienteAproveitamento,
        IPTUAnual,
        IPTUMensal,
        aluguelValor: tipo === "aluguel" ? aluguelValor : undefined,
        valor: tipo === "venda" ? valor : undefined,
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

    // Adicionar parâmetros específicos com base na nova categoria
    switch (imovel.categoria) {
      case "andar corrido":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2000;
        break;
      case "apartamento":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1000;
        break;
      case "área privativa":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2010;
        break;
      case "casa":
        leadData.BusinessType = ["SALE"];
        leadData.category = 1010;
        break;
      case "chácara":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2020;
        break;
      case "cobertura":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2030;
        break;
      case "fazenda":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2040;
        break;
      case "flat":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2050;
        break;
      case "galpão":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2060;
        break;
      case "garagem":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2070;
        break;
      case "kitnet":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2080;
        break;
      case "loja":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2090;
        break;
      case "lote":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2100;
        break;
      case "lote em condomínio":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2110;
        break;
      case "prédio":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2120;
        break;
      case "sala":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2130;
        break;
      case "salão":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2140;
        break;
      case "sítio":
        leadData.BusinessType = ["SALE"];
        leadData.category = 2150;
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
  upload,
};
