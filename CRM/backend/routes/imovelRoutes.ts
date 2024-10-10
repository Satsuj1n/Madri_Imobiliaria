import express, { Request, Response } from "express";
import * as imovelController from "../controllers/imovelController";
import checkAdmin from "../middleware/checkAdmin";
import auth from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Rota para criar um novo imóvel
router.post("/", auth, asyncHandler((req: Request, res: Response) => imovelController.createImovel(req, res)));

// Rota para buscar um imóvel específico por ID
router.get("/:id", asyncHandler((req: Request, res: Response) => imovelController.getImovelById(req, res)));

// Rota para atualizar um imóvel existente
router.put("/:id", auth, asyncHandler((req: Request, res: Response) => imovelController.updateImovel(req, res)));

// Rota para deletar um imóvel
router.delete("/:id", auth, asyncHandler((req: Request, res: Response) => imovelController.deleteImovel(req, res)));

// Rota para o admin aprovar um imóvel e enviar para OLX/Zap
router.put("/:id/aprovar", auth, checkAdmin, asyncHandler((req: Request, res: Response) => imovelController.aprovarImovel(req, res)));

export default router;
