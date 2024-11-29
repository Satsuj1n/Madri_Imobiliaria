import auth from "../middleware/auth"; // Middleware de autenticação
import express from "express";
import * as interesseController from "../controllers/interesseController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Rota para salvar interesse sem `auth`
router.post("/", auth, asyncHandler(interesseController.salvarInteresse));


// Mantenha `auth` na rota GET para proteger o acesso aos interesses
router.get("/", auth, asyncHandler(interesseController.getInteresses));

export default router;