import express, { Request, Response } from "express";
import * as imovelController from "../controllers/imovelController";
import checkAdmin from "../middleware/checkAdmin";
import auth from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import multer from "multer";

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Rota para criar um novo imóvel
router.post(
  "/",
  auth,
  asyncHandler((req: Request, res: Response) =>
    imovelController.createImovel(req, res)
  )
);

// Rota para buscar um imóvel específico por ID
router.get(
  "/:id",
  asyncHandler((req: Request, res: Response) =>
    imovelController.getImovelById(req, res)
  )
);

router.get(
  "/",
  asyncHandler((req: Request, res: Response) =>
    imovelController.getAllImoveis(req, res)
  )
);

// Nova rota para upload de imagens após o imóvel ser criado
router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "imagemPrincipal", maxCount: 1 },
    { name: "outrasImagens", maxCount: 10 }, // Ajuste o limite conforme necessário
  ]),
  asyncHandler((req: Request, res: Response) => {
    console.log("Recebendo requisição para upload de imagens...");
    console.log("Arquivos recebidos:", req.files); // Verifica os arquivos recebidos
    console.log("Dados do corpo da requisição:", req.body); // Verifica o corpo da requisição
    imovelController.adicionarImagens(req, res);
  })
);

// Rota para atualizar um imóvel existente
router.put(
  "/:id",
  auth,
  asyncHandler((req: Request, res: Response) =>
    imovelController.updateImovel(req, res)
  )
);

// Rota para deletar um imóvel
router.delete(
  "/:id",
  auth,
  asyncHandler((req: Request, res: Response) =>
    imovelController.deleteImovel(req, res)
  )
);

// Rota para o admin aprovar um imóvel e enviar para OLX/Zap
router.put(
  "/:id/aprovar",
  auth,
  checkAdmin,
  asyncHandler((req: Request, res: Response) =>
    imovelController.aprovarImovel(req, res)
  )
);

export default router;
