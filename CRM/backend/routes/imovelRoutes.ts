import express, { Request, Response } from "express";
import * as imovelController from "../controllers/imovelController";
import checkAdmin from "../middleware/checkAdmin";
import auth from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import multer from "multer";
import path from "path";

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório para armazenar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com timestamp
  },
});

const upload = multer({ storage }).fields([
  { name: "imagemPrincipal", maxCount: 1 },
  { name: "imagensSecundarias", maxCount: 5 },
]);

const router = express.Router();

// Rota para criar um novo imóvel com upload de imagens
router.post(
  "/",
  auth,
  (req: Request, res: Response, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro no upload de imagens" });
      }
      next();
    });
  },
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

// Rota para atualizar um imóvel existente com upload de imagens
router.put(
  "/:id",
  auth,
  (req: Request, res: Response, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro no upload de imagens" });
      }
      next();
    });
  },
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
