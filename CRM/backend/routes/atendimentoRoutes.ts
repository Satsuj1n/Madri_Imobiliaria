import express, { Request, Response } from "express";
import * as atendimentoController from "../controllers/atendimentoController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Rotas de Atendimento
router.get("/", asyncHandler(atendimentoController.getAllAtendimentos));
router.post("/", asyncHandler(atendimentoController.createAtendimento));
router.get("/:id", asyncHandler(atendimentoController.getAtendimentoById));
router.put("/:id", asyncHandler(atendimentoController.updateAtendimento));
router.delete("/:id", asyncHandler(atendimentoController.deleteAtendimento));

export default router;
