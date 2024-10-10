import { Request, Response } from "express";
import Imovel from "../models/imovel";
import axios from "axios";

// Função para listar todos os imóveis
export const getAllImoveis = async (req: Request, res: Response) => {
  try {
    const imoveis = await Imovel.find();
    res.json(imoveis);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imóveis" });
  }
};

// Função para criar um novo imóvel
export const createImovel = async (req: Request, res: Response) => {
  const {
    titulo,
    descricao,
    valor,
    localizacao,
    area,
    tipo,
    categoria,
    cliente,
    message,
  } = req.body;

  const novoImovel = new Imovel({
    titulo,
    descricao,
    valor,
    localizacao,
    area,
    tipo,
    categoria,
    cliente,
    message,
    status: "pendente", // Imóvel começa como "pendente"
  });

  try {
    const imovel = await novoImovel.save();
    res.status(201).json(imovel);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar imóvel" });
  }
};

// Função para buscar um imóvel por ID
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

// Função para atualizar um imóvel existente
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

// Função para deletar um imóvel
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

// Função para aprovar um imóvel (somente admins) e enviar o anúncio para OLX/Zap
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
  aprovarImovel
};

