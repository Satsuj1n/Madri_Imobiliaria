import { Request, Response } from "express";
import Atendimento from "../models/atendimento";
import { asyncHandler } from "../utils/asyncHandler";

// Função para buscar todos os atendimentos
export const getAllAtendimentos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const atendimentos = await Atendimento.find()
    .populate("cliente")
    .populate("imovel")
    .populate("condominio");
  res.json(atendimentos);
});

// Função para criar um novo atendimento
export const createAtendimento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { cliente, imovel, condominio, dataAtendimento, status, tipoAtendimento, observacoes, responsavelAtendimento } = req.body;

  const novoAtendimento = new Atendimento({
    cliente,
    imovel,
    condominio,
    dataAtendimento,
    status,
    tipoAtendimento,
    observacoes,
    responsavelAtendimento,
  });

  const atendimento = await novoAtendimento.save();
  res.status(201).json(atendimento);
});

// Função para buscar um atendimento pelo ID
export const getAtendimentoById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const atendimento = await Atendimento.findById(req.params.id)
    .populate("cliente")
    .populate("imovel")
    .populate("condominio");

  if (!atendimento) {
    res.status(404).json({ error: "Atendimento não encontrado" });
    return;
  }

  res.json(atendimento);
});

// Função para atualizar um atendimento
export const updateAtendimento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const atendimento = await Atendimento.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!atendimento) {
    res.status(404).json({ error: "Atendimento não encontrado" });
    return;
  }

  res.json(atendimento);
});

// Função para deletar um atendimento
export const deleteAtendimento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const atendimento = await Atendimento.findByIdAndDelete(req.params.id);

  if (!atendimento) {
    res.status(404).json({ error: "Atendimento não encontrado" });
    return;
  }

  res.json({ message: "Atendimento deletado com sucesso" });
});
