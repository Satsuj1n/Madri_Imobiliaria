import { Request, Response } from "express";
import Imovel from "../models/imovel";
import Cliente from "../models/cliente";
import jwt from "jsonwebtoken";
import axios from "axios";
import { uploadFileToS3 } from "../utils/s3Service"; // Adjust the path as necessary

// Função para criar um novo imóvel
export const createImovel = async (req: Request, res: Response) => {
  try {
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

    // Pega o restante das informações do corpo da requisição
    const {
      titulo,
      descricao,
      endereco,
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
      areaInterna,
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

    console.log("Dados do imóvel recebidos:", {
      titulo,
      descricao,
      endereco,
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
      areaInterna,
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
    });

    // Aqui você adiciona a lógica para lidar com o upload das imagens
    let imagemPrincipalUrl = "";
    let outrasImagensUrls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      const files = req.files as Express.Multer.File[];

      for (const file of files) {
        const s3Result = await uploadFileToS3(file); // Função para subir imagem ao S3
        if (file.fieldname === "imagemPrincipal") {
          imagemPrincipalUrl = s3Result; // Salva o URL da imagem principal diretamente
        } else if (file.fieldname === "outrasImagens") {
          outrasImagensUrls.push(s3Result); // Adiciona o URL das outras imagens
        }
      }
    }

    const novoImovel = new Imovel({
      titulo,
      descricao,
      endereco,
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
      areaInterna,
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
      imagemPrincipal: imagemPrincipalUrl, // Armazena o URL da imagem principal
      outrasImagens: outrasImagensUrls, // Armazena os URLs das outras imagens
    });

    console.log("Novo imóvel a ser criado:", novoImovel);

    const imovel = await novoImovel.save();
    console.log("Imóvel criado com sucesso:", imovel);

    return res.status(201).json(imovel);
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    return res.status(500).json({ error: "Erro ao criar imóvel" });
  }
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
};
