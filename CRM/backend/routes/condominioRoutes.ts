import express, { Request, Response } from "express";
import * as condominioController from "../controllers/condominioController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Definir as rotas de CRUD para Condomínios
router.get(
  "/",
  asyncHandler((req: Request, res: Response) => condominioController.getAllCondominios(req, res))
);

router.post(
  "/",
  asyncHandler((req: Request, res: Response) => condominioController.createCondominio(req, res))
);

router.get(
  "/:id",
  asyncHandler((req: Request, res: Response) => condominioController.getCondominioById(req, res))
);

router.put(
  "/:id",
  asyncHandler((req: Request, res: Response) => condominioController.updateCondominio(req, res))
);

router.delete(
  "/:id",
  asyncHandler((req: Request, res: Response) => condominioController.deleteCondominio(req, res))
);

export default router;
