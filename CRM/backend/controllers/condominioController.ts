import { Request, Response } from "express";
import Condominio, { CondominioDocument } from "../models/condominio"

// Função para buscar todos os condomínios
export const getAllCondominios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const condominios = await Condominio.find();
    return res.json(condominios);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar condomínios" });
  }
};

// Função para criar um novo condomínio
export const createCondominio = async (req: Request, res: Response): Promise<Response> => {
  const {
    nome,
    tipoCondominio,
    construtora,
    areaLoteTerreno,
    cidade,
    bairro,
    endereco,
    numero,
    caracteristicasExtrasCondominio,
    caracteristicasExtrasImovel,
  } = req.body;

  const novoCondominio = new Condominio({
    nome,
    tipoCondominio,
    construtora,
    areaLoteTerreno,
    cidade,
    bairro,
    endereco,
    numero,
    caracteristicasExtrasCondominio,
    caracteristicasExtrasImovel,
  });

  try {
    const condominio = await novoCondominio.save();
    return res.status(201).json(condominio);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar condomínio" });
  }
};

// Função para buscar um condomínio pelo ID
export const getCondominioById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const condominio = await Condominio.findById(req.params.id);
    if (!condominio) return res.status(404).json({ error: "Condomínio não encontrado" });
    return res.json(condominio);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar condomínio" });
  }
};

// Função para atualizar um condomínio
export const updateCondominio = async (req: Request, res: Response): Promise<Response> => {
  try {
    const condominio = await Condominio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!condominio) return res.status(404).json({ error: "Condomínio não encontrado" });
    return res.json(condominio);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar condomínio" });
  }
};

// Função para deletar um condomínio
export const deleteCondominio = async (req: Request, res: Response): Promise<Response> => {
  try {
    const condominio = await Condominio.findByIdAndDelete(req.params.id);
    if (!condominio) return res.status(404).json({ error: "Condomínio não encontrado" });
    return res.json({ message: "Condomínio deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar condomínio" });
  }
};



