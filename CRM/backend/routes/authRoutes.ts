import express, { Request, Response } from "express";
import { signup, login } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Rota de Registro (Sign Up)
router.post("/signup", asyncHandler((req: Request, res: Response) => signup(req, res)));

// Rota de Login
router.post("/login", asyncHandler((req: Request, res: Response) => login(req, res)));

// Rota de teste
router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Rota de teste funcionando corretamente" });
});

export default router;
