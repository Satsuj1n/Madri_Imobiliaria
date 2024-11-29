import express, { Request, Response } from "express";
import { signup, login, getUserDetails } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";
import auth from "../middleware/auth"; // Certifique-se de ajustar o caminho conforme necessário


const router = express.Router();

// Rota de Registro (Sign Up)
router.post("/signup", asyncHandler((req: Request, res: Response) => signup(req, res)));

// Rota de Login
router.post("/login", asyncHandler((req: Request, res: Response) => login(req, res)));

// Rota de teste
router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Rota de teste funcionando corretamente" });
});

router.get(
  "/me",
  auth, // Middleware de autenticação
  asyncHandler((req: Request, res: Response) => getUserDetails(req, res))
);

export default router;
